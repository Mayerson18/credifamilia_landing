import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProcessingState = 'procesando1' | 'procesando2' | 'procesando3' | 'procesando4';
export type ResultState = 'aprobado' | 'no-viable' | 'falla-tecnica' | 'zona-gris';

@Component({
  selector: 'app-processing-modal',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          (click)="onClose()" 
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="text-center">
          <div class="mb-4">
            <svg class="w-16 h-16 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Validación en proceso
          </h3>
          
          <p class="text-gray-600 mb-4">
            {{ getProcessingMessage() }}
          </p>
          
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              class="bg-green-600 h-2 rounded-full transition-all duration-500"
              [style.width.%]="getProgressPercentage()"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .transition-all {
      transition: all 0.5s ease-in-out;
    }
  `]
})
export class ProcessingModalComponent {
  @Input() state: ProcessingState = 'procesando1';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  getProcessingMessage(): string {
    const messages = {
      'procesando1': 'Estamos validando si tu crédito es viable, en breve recibirás la respuesta.',
      'procesando2': 'Esto puede tardar unos segundos más, gracias por esperar.',
      'procesando3': 'No cierres la ventana, estamos casi listos.',
      'procesando4': 'Esto está tardando más de lo normal... Gracias por tu paciencia.'
    };
    return messages[this.state];
  }

  getProgressPercentage(): number {
    const percentages = {
      'procesando1': 25,
      'procesando2': 50,
      'procesando3': 75,
      'procesando4': 100
    };
    return percentages[this.state];
  }
}
