import { Component } from '@angular/core';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-partners',
  imports: [],
  templateUrl: './partners.html',
  styleUrl: './partners.css'
})
export class PartnersComponent {
  partners: Partner[] = [
    {
      id: 1,
      name: 'Rastrepo Zuluaga',
      logo: 'assets/aliado1.png'
    },
    {
      id: 2,
      name: 'Acabados Vivicomfort',
      logo: 'assets/aliado2.png'
    },
    {
      id: 3,
      name: 'Vivvídero',
      logo: 'assets/aliado3.png'
    },
    {
      id: 4,
      name: 'Tervi',
      logo: 'assets/aliado4.png'
    },
    {
      id: 5,
      name: 'Integrar',
      logo: 'assets/aliado5.png'
    },
    {
      id: 6,
      name: 'Total Home',
      logo: 'assets/aliado6.png'
    },
    {
      id: 7,
      name: 'DHWCITIO',
      logo: 'assets/aliado7.png'
    },
    {
      id: 8,
      name: 'TL Interiors',
      logo: 'assets/aliado8.png'
    }
  ];
}
