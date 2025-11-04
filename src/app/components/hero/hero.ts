import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselStateService } from '../../services/carousel-state.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

interface CarouselSlide {
  id: number;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoSlideInterval: any;
  autoSlideDelay = 5000;
  private sub?: Subscription;

  slides: CarouselSlide[] = [
    {
      id: 1,
      image: 'assets/web/banner1.png',
      imageAlt: '...',
      title: 'Crédito para remodelación de vivienda VIS',
      subtitle: 'Sin hipoteca',
      buttonText: 'Solicítalo aquí',
    },
    {
      id: 2,
      image: 'assets/web/banner2.png',
      imageAlt: '...',
      title: 'Estrena tu hogar terminado desde ya',
      subtitle: 'No necesitas tener crédito hipotecario con Credifamilia',
      buttonText: 'Solicítalo aquí',
    },
    {
      id: 3,
      image: 'assets/web/banner3.png',
      imageAlt: '...',
      title: 'Aprobación en línea y 100% digital',
      subtitle: 'Obtén respuesta inmediata de tu crédito de acabados',
      buttonText: 'Solicítalo aquí',
    },
  ];

  constructor(private carouselState: CarouselStateService) {}
  
  private destroy$ = new Subject<void>();
  ngOnInit() {
    this.carouselState.setSlidesLength(this.slides.length);

    this.carouselState.currentSlide$.pipe(takeUntil(this.destroy$)).subscribe((idx: number) => {
      if (idx !== this.currentSlide) {
        this.currentSlide = idx;
        this.resetAutoSlide();
      }
    });

    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.carouselState.setCurrentSlide(index); // sincroniza al servicio
    this.resetAutoSlide();
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next); // reutiliza para sincronizar
  }

  prevSlide() {
    const prev = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prev);
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  get currentSlideData() {
    return this.slides[this.currentSlide];
  }

  scrollToForm() {
    const ctaSection = document.querySelector('app-cta');
    if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
