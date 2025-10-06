import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselSlide {
  id: number;
  image: string;
  imageAlt: string;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoSlideInterval: any;
  autoSlideDelay = 5000; // 5 seconds

  slides: CarouselSlide[] = [
    {
      id: 1,
      image: 'assets/web/banner1.png',
      imageAlt: 'Crédito para remodelación de vivienda VIS - Sin hipoteca'
    },
    {
      id: 2,
      image: 'assets/web/banner2.png',
      imageAlt: 'Estrena tu hogar terminado desde ya - No necesitas tener crédito hipotecario'
    },
    {
      id: 3,
      image: 'assets/web/banner3.png',
      imageAlt: 'Aprobación en línea y 100% digital - Obtén respuesta inmediata'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.resetAutoSlide();
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  get currentSlideData() {
    return this.slides[this.currentSlide];
  }
}
