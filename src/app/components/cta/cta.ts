import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteAcabadosService, ClienteAcabadosDto } from '../../services/cliente-acabados.service';
import { OtpService } from '../../services/otp.service';
import { PrevalidadorSoapService, PrevalidadorSoapRequestDto } from '../../services/prevalidador-soap.service';
import { EncryptionService } from '../../services/encryption.service';
import { ProcessingModalComponent } from '../processing-modal/processing-modal.component';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { TermsModalComponent } from '../terms-modal/terms-modal.component';

@Component({
  selector: 'app-cta',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ProcessingModalComponent, ResultModalComponent, TermsModalComponent],
  templateUrl: './cta.html',
  styleUrl: './cta.css'
})
export class CtaComponent implements OnInit {
  creditForm!: FormGroup;
  isSubmitting = false;
  showOtpStep = false;
  isProcessing = false;
  showResult = false;
  showTermsModal = false;
  otpCode = '';
  
  currentProcessingState: 'procesando1' | 'procesando2' | 'procesando3' | 'procesando4' = 'procesando1';
  resultState: 'aprobado' | 'no-viable' | 'falla-tecnica' | 'zona-gris' = 'aprobado';
  approvedResult?: { monto: string; idLead: string; idOportunidad: string };
  reviewResult?: { idLead: string; idOportunidad: string };
  
  private processingInterval?: number;
  private currentLeadId = '';
  private currentOportunidadId = '';

  constructor(
    private fb: FormBuilder,
    private clienteAcabadosService: ClienteAcabadosService,
    private otpService: OtpService,
    private prevalidadorSoapService: PrevalidadorSoapService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.creditForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[3][0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.creditForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.creditForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    switch (fieldName) {
      case 'documentType':
        return 'Selecciona un tipo de documento';
      case 'documentNumber':
        if (errors['required']) return 'El número de documento es requerido';
        if (errors['pattern']) return 'Solo se permiten números';
        break;
      case 'firstName':
        if (errors['required']) return 'Los nombres son requeridos';
        if (errors['minlength']) return 'Mínimo 2 caracteres';
        break;
      case 'lastName':
        if (errors['required']) return 'El apellido es requerido';
        if (errors['minlength']) return 'Mínimo 2 caracteres';
        break;
      case 'birthDate':
        return 'La fecha de nacimiento es requerida';
      case 'city':
        return 'Selecciona una ciudad';
      case 'phone':
        if (errors['required']) return 'El celular es requerido';
        if (errors['pattern']) return 'Ingresa un número válido (ej: 3112224455)';
        break;
      case 'email':
        if (errors['required']) return 'El correo electrónico es requerido';
        if (errors['email']) return 'Ingresa un correo válido';
        break;
      case 'acceptTerms':
        return 'Debes aceptar los términos y condiciones';
    }

    return 'Campo inválido';
  }

  onSubmit() {
    if (this.creditForm.valid) {
      this.isSubmitting = true;
      const formData = this.creditForm.value;
      
      const clienteData: ClienteAcabadosDto = {
        tipoDocumento: this.mapDocumentType(formData.documentType),
        numeroDocumento: formData.documentNumber,
        nombres: formData.firstName,
        primerApellido: formData.lastName,
        fechaNacimiento: formData.birthDate,
        celular: formData.phone,
        correoElectronico: formData.email,
        ciudadVivienda: this.mapCity(formData.city)
      };
      
      this.clienteAcabadosService.crearCliente(clienteData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.code === 200 && response.data) {
            const decryptedData = this.encryptionService.decrypt(response.data);
            this.currentLeadId = decryptedData.idLead;
            this.currentOportunidadId = decryptedData.idOportunidad;
            this.generateOtp();
          } else {
            this.showErrorResult();
          }
        },
        error: () => {
          this.isSubmitting = false;
          this.showErrorResult();
        }
      });
    } else {
      Object.keys(this.creditForm.controls).forEach(key => {
        this.creditForm.get(key)?.markAsTouched();
      });
    }
  }

  generateOtp() {
    const phone = this.creditForm.get('phone')?.value;
    this.isSubmitting = true;
    
    this.otpService.generarOtp(phone).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.code === 200) {
          this.showOtpStep = true;
        } else {
          this.showErrorResult();
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.showErrorResult();
      }
    });
  }

  validateOtp() {
    const phone = this.creditForm.get('phone')?.value;
    this.isSubmitting = true;
    
    this.otpService.validarOtp(phone, this.otpCode).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.code === 200) {
          this.updateClientWithOtp();
        } else {
          this.showErrorResult();
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.showErrorResult();
      }
    });
  }

  updateClientWithOtp() {
    this.isSubmitting = true;
    
    this.clienteAcabadosService.updateClienteAcabados({
      idOportunidad: this.currentOportunidadId,
      idLead: this.currentLeadId,
      detalle: 'OTP exitoso'
    }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.code === 200) {
          this.startPrevalidadorProcess();
        } else {
          this.showErrorResult();
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.showErrorResult();
      }
    });
  }

  startPrevalidadorProcess() {
    this.isProcessing = true;
    this.currentProcessingState = 'procesando1';
    
    this.startProcessingSimulation();
    this.consultPrevalidador();
  }

  startProcessingSimulation() {
    const states: ('procesando1' | 'procesando2' | 'procesando3' | 'procesando4')[] = ['procesando1', 'procesando2', 'procesando3', 'procesando4'];
    let currentIndex = 0;
    
    this.processingInterval = window.setInterval(() => {
      if (currentIndex < states.length - 1) {
        currentIndex++;
        this.currentProcessingState = states[currentIndex];
      }
    }, 2000);
  }

  consultPrevalidador() {
    const formData = this.creditForm.value;
    const edad = this.calculateAge(formData.birthDate);
    
    const prevalidadorRequest: PrevalidadorSoapRequestDto = {
      idOportunidad: this.currentOportunidadId,
      nombre: formData.firstName,
      apellidos: formData.lastName,
      numDocumento: formData.documentNumber,
      tipoDocumento: formData.documentType,
      idTipoDocumento: formData.documentType === 'cc' ? '1' : '2',
      edad: edad.toString(),
      correo: formData.email
    };

    setTimeout(() => {
      this.prevalidadorSoapService.consultarPrevalidador(prevalidadorRequest).subscribe({
        next: (response) => {
          this.stopProcessingSimulation();
          if (response.code === 200) {
            this.checkPrevalidadorResult();
          } else {
            this.showErrorResult();
          }
        },
        error: () => {
          this.stopProcessingSimulation();
          this.showErrorResult();
        }
      });
    }, 8000);
  }

  checkPrevalidadorResult() {
    const numeroDocumento = this.creditForm.get('documentNumber')?.value;
    const fechaEnvioSolicitud = new Date().toISOString();
    
    this.clienteAcabadosService.ultimoResultadoPrevalidador(
      numeroDocumento, 
      this.currentOportunidadId, 
      fechaEnvioSolicitud
    ).subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          const decryptedData = this.encryptionService.decrypt(response.data);
          this.handlePrevalidadorResult(decryptedData);
        } else if (response.code === 204) {
          this.resultState = 'zona-gris';
          this.reviewResult = {
            idLead: this.currentLeadId,
            idOportunidad: this.currentOportunidadId
          };
          this.showResult = true;
        } else {
          this.resultState = 'no-viable';
          this.showResult = true;
        }
      },
      error: () => {
        this.showErrorResult();
      }
    });
  }

  handlePrevalidadorResult(data: any) {
    if (data.Resultado_del_Prevalidador__c === 'VIABLE') {
      this.resultState = 'aprobado';
      this.approvedResult = {
        monto: this.formatCurrency(data.Monto_sugerido_preaprobado__c),
        idLead: this.currentLeadId,
        idOportunidad: this.currentOportunidadId
      };
    } else {
      this.resultState = 'no-viable';
    }
    this.showResult = true;
  }

  resendOtp() {
    this.generateOtp();
  }

  onProcessingClose() {
    this.stopProcessingSimulation();
    this.isProcessing = false;
  }

  onResultClose() {
    this.showResult = false;
    this.resetForm();
  }

  onTalkToAdvisor() {
    console.log('Contactar asesor con datos:', {
      idLead: this.currentLeadId,
      idOportunidad: this.currentOportunidadId,
      resultState: this.resultState
    });
  }

  onRetry() {
    this.showResult = false;
    this.showOtpStep = false;
    this.resetForm();
  }

  openTerms(event: Event) {
    event.preventDefault();
    this.showTermsModal = true;
  }

  onTermsClose() {
    this.showTermsModal = false;
  }

  private stopProcessingSimulation() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = undefined;
    }
  }

  private showErrorResult() {
    this.resultState = 'falla-tecnica';
    this.showResult = true;
  }

  private resetForm() {
    this.creditForm.reset();
    this.otpCode = '';
    this.currentLeadId = '';
    this.currentOportunidadId = '';
  }

  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  private formatCurrency(amount: string): string {
    const numAmount = parseInt(amount);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numAmount);
  }

  private mapDocumentType(type: string): string {
    const mapping: { [key: string]: string } = {
      'cc': 'CEDULA_CIUDADANIA',
      'ce': 'CEDULA_EXTRANJERIA',
      'passport': 'PASAPORTE'
    };
    return mapping[type] || 'CEDULA_CIUDADANIA';
  }

  private mapCity(city: string): string {
    const mapping: { [key: string]: string } = {
      'bogota': 'BOGOTA',
      'medellin': 'MEDELLIN',
      'armenia': 'ARMENIA',
      'pereira': 'PEREIRA',
      'barranquilla': 'BARRANQUILLA',
      'bucaramanga': 'BUCARAMANGA',
      'cali': 'CALI',
      'cartagena': 'CARTAGENA',
      'santa-marta': 'SANTA MARTA',
      'ibague': 'IBAGUE',
      'manizales': 'MANIZALES',
      'otra': 'OTRA'
    };
    return mapping[city] || 'BOGOTA';
  }
}
