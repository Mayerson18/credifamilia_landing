import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms-modal',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          (click)="onClose()" 
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Términos y condiciones</h2>
          
          <h3 class="text-lg font-bold text-gray-900 mb-4 uppercase">
            AUTORIZACIÓN PARA EL TRATAMIENTO DE TUS DATOS PERSONALES
          </h3>
          
          <h4 class="text-base font-bold text-gray-900 mb-3">¿Qué estás autorizando?</h4>
          
          <p class="text-gray-700 mb-4">
            Estás manifestando de manera libre, previa e informada, que CREDIFAMILIA, sus aliados comerciales y operacionales, van a tratar tus datos personales por medios físicos o digitales para:
          </p>
          
          <ol class="list-decimal list-inside text-gray-700 mb-6 space-y-3">
            <li>
              Consultar centrales de riesgos y centrales de información de seguridad social para obtener la información necesaria en el análisis de tu crédito y cumplir con las normas de prevención de Lavado de Activos y Financiación de Terrorismo que nos pide la regulación.
            </li>
            <li>
              Validar que seas tú quien está tomando el crédito a través de mecanismos como tu foto, y la verificación de tu documento ante la Registraduría.
            </li>
            <li>
              Si tu crédito es aprobado, te contactaremos por los canales que autorices para realizar las actividades de cobranza de tu obligación.
            </li>
            <li>
              Ofrecerte productos o servicios de CREDIFAMILIA o sus aliados comerciales a través de canales tradicionales o digitales. No te preocupes que no seremos insistentes y buscaremos ser pertinentes.
            </li>
            <li>
              Compartiremos o transmitiremos tus datos únicamente con terceros relacionados con el objeto social de CREDIFAMILIA, tales como Deceval, centrales de información, bancos de segundo piso, fondos de garantías o agremiaciones.
            </li>
          </ol>
          
          <h4 class="text-base font-bold text-gray-900 mb-3">Al autorizar, indicas que tienes DERECHO a:</h4>
          
          <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Conocer, actualizar, rectificar o suprimir tus datos personales.</li>
            <li>Solicitar prueba de esta autorización o solicitar su cancelación.</li>
            <li>Tener conocimiento sobre el uso que van a tener tus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
          </ul>
          
          <h4 class="text-base font-bold text-gray-900 mb-3">¿Cuál es la vigencia de esta autorización?</h4>
          
          <p class="text-gray-700 mb-4">
            Permanecerá vigente hasta que tú solicites su cancelación, siempre y cuando no tengas un producto vigente en CREDIFAMILIA.
          </p>
          
          <p class="text-gray-700 mb-6">
            Si deseas conocer cómo nuestros aliados, proveedores o Credifamilia gestionarán tu información, puedes consultar nuestra Política de Tratamiento de Datos en 
            <a href="https://www.credifamilia.com" target="_blank" class="text-green-600 hover:text-green-700 underline">
              www.credifamilia.com
            </a>.
          </p>
          
          <div class="flex justify-end">
            <button 
              (click)="onClose()"
              class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-decimal li {
      margin-bottom: 0.75rem;
    }
    
    .list-disc li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class TermsModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
