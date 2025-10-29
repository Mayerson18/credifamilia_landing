import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ApprovedResult {
  monto: string;
  idLead: string;
  idOportunidad: string;
}

export interface ReviewResult {
  idLead: string;
  idOportunidad: string;
}

@Component({
  selector: 'app-result-modal',
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
          <!-- Approved State -->
          <div *ngIf="state === 'aprobado'" class="mb-4">
            <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Crédito Aprobado</h3>
            <p class="text-gray-600 mb-4">
              Tu crédito de acabados fue aprobado por: {{ approvedResult?.monto }}
            </p>
            <p class="text-sm text-gray-500 mb-6">
              Uno de nuestros asesores te contactará en las próximas horas hábiles para continuar con el proceso.
            </p>
            <button 
              (click)="onTalkToAdvisor()"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Hablar con un asesor
            </button>
          </div>

          <!-- Not Viable State -->
          <div *ngIf="state === 'no-viable'" class="mb-4">
            <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Crédito no viable</h3>
            <p class="text-gray-600">
              Lo sentimos, tu crédito de acabados no cumple con los requisitos necesarios para ser aprobado en este momento.
            </p>
          </div>

          <!-- Technical Failure State -->
          <div *ngIf="state === 'falla-tecnica'" class="mb-4">
            <div class="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Ups, algo salió mal</h3>
            <p class="text-gray-600 mb-6">
              No se pudo completar tu solicitud.
            </p>
            <button 
              (click)="onRetry()"
              class="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Inténtalo de nuevo
            </button>
          </div>

          <!-- Review State -->
          <div *ngIf="state === 'zona-gris'" class="mb-4">
            <div class="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Solicitud en revisión</h3>
            <p class="text-gray-600 mb-4">
              Para continuar con tu crédito, requerimos una verificación extra. Un asesor se comunicará contigo en las próximas horas hábiles para continuar con el proceso.
            </p>
            <button 
              (click)="onTalkToAdvisor()"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Hablar con un asesor
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResultModalComponent {
  @Input() state: 'aprobado' | 'no-viable' | 'falla-tecnica' | 'zona-gris' = 'aprobado';
  @Input() approvedResult?: ApprovedResult;
  @Input() reviewResult?: ReviewResult;
  @Output() close = new EventEmitter<void>();
  @Output() talkToAdvisor = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onTalkToAdvisor() {
    this.talkToAdvisor.emit();
  }

  onRetry() {
    this.retry.emit();
  }
}
