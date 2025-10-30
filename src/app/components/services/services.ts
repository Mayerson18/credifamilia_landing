import { Component } from '@angular/core';
import { CtaButtonComponent } from '../cta-button/cta-button';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-services',
  imports: [CtaButtonComponent],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  services: Service[] = [
    {
      id: 1,
      title: '100% digital con aprobación inmediata',
      description: '100% digital con aprobación inmediata',
      image: 'assets/web/item1.png'
    },
    {
      id: 2,
      title: 'Financiación desde $10.000.000',
      description: 'Financiación desde $10.000.000',
      image: 'assets/web/item2.png'
    },
    {
      id: 3,
      title: 'Crédito sin hipoteca',
      description: 'Crédito sin hipoteca',
      image: 'assets/web/item3.png'
    },
    {
      id: 4,
      title: 'Plazos a tu medida, desde 1 hasta 5 años',
      description: 'Plazos a tu medida, desde 1 hasta 5 años',
      image: 'assets/web/item4.png'
    },
    {
      id: 5,
      title: 'Alianza con empresas de acabados especializadas',
      description: 'Alianza con empresas de acabados especializadas',
      image: 'assets/web/item5.png'
    },
    {
      id: 6,
      title: 'Estudio sin costo',
      description: 'Estudio sin costo',
      image: 'assets/web/item6.png'
    }
  ];
}