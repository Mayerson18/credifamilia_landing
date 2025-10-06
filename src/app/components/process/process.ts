import { Component } from '@angular/core';

interface ProcessStep {
  id: number;
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-process',
  imports: [],
  templateUrl: './process.html',
  styleUrl: './process.css'
})
export class ProcessComponent {
  processSteps: ProcessStep[] = [
    {
      id: 1,
      number: 1,
      title: 'Solicita la aprobación en menos de 1 minuto',
      description: 'Ingresa tus datos y válida si el crédito es viable'
    },
    {
      id: 2,
      number: 2,
      title: 'Elige un aliado',
      description: 'Si tu crédito es aprobado, te direccionaremos con uno de nuestros aliados de Acabados'
    },
    {
      id: 3,
      number: 3,
      title: 'Realiza los acabados que soñaste',
      description: 'Firma el acuerdo y Credifamilia le desembolsa directamente al aliado'
    }
  ];

  onCtaClick() {
    console.log('CTA clicked: Solicitar proceso de acabados');
  }
}