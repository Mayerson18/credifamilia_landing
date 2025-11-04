import { Component, OnDestroy, OnInit } from '@angular/core';
import { CtaButtonComponent } from '../cta-button/cta-button';
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component';
import { CarouselStateService } from '../../services/carousel-state.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent, PaginationDotsComponent],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: Service[] = [
    {
      id: 1,
      title: '100% digital con aprobación inmediata',
      description: '100% digital con aprobación inmediata',
      image: 'assets/web/item1.png',
    },
    {
      id: 2,
      title: 'Financiación desde $10.000.000',
      description: 'Financiación desde $10.000.000',
      image: 'assets/web/item2.png',
    },
    {
      id: 3,
      title: 'Crédito sin hipoteca',
      description: 'Crédito sin hipoteca',
      image: 'assets/web/item3.png',
    },
    {
      id: 4,
      title: 'Plazos a tu medida, desde 1 hasta 5 años',
      description: 'Plazos a tu medida, desde 1 hasta 5 años',
      image: 'assets/web/item4.png',
    },
    {
      id: 5,
      title: 'Alianza con empresas de acabados especializadas',
      description: 'Alianza con empresas de acabados especializadas',
      image: 'assets/web/item5.png',
    },
    {
      id: 6,
      title: 'Estudio sin costo',
      description: 'Estudio sin costo',
      image: 'assets/web/item6.png',
    },
  ];

  currentSlide = 0;
  slidesLength = 0;

  private sub?: Subscription;
  private lenSub?: Subscription;

  constructor(private carouselState: CarouselStateService) {}

  ngOnInit(): void {
    this.sub = this.carouselState.currentSlide$.subscribe((i: number) => {
      this.currentSlide = i;
    });

    this.lenSub = this.carouselState.slidesLength$.subscribe((len: number) => {
      this.slidesLength = len;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.lenSub?.unsubscribe();
  }

  onDotSelect(index: number): void {
    this.carouselState.setCurrentSlide(index);
  }
}
