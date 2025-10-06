import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cta.html',
  styleUrl: './cta.css'
})
export class CtaComponent implements OnInit {
  creditForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

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
      
      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.creditForm.value);
        this.isSubmitting = false;
        // Aquí iría la lógica para enviar los datos al servidor
        alert('¡Formulario enviado exitosamente!');
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.creditForm.controls).forEach(key => {
        this.creditForm.get(key)?.markAsTouched();
      });
    }
  }
}
