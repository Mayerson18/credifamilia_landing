import { Component, OnInit, OnDestroy } from '@angular/core';

interface Testimonial {
  id: number;
  clientName: string;
  company: string;
  location: string;
  quote: string;
  videoId: string;
  thumbnail: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  maxSlides = 0;
  autoSlideInterval: any;
  
  testimonials: Testimonial[] = [
    {
      id: 1,
      clientName: 'Catalina Suárez',
      company: 'Diámetro Ingeniería y Construcción',
      location: 'Medellín',
      quote: 'Todo lo que soñé se hizo realidad',
      videoId: 'dQw4w9WgXcQ', // Reemplaza con ID real de YouTube
      thumbnail: 'assets/testimonials/catalina-thumb.jpg'
    },
    {
      id: 2,
      clientName: 'María González',
      company: 'Constructora ABC',
      location: 'Bogotá',
      quote: 'Excelente servicio y calidad',
      videoId: 'dQw4w9WgXcQ', // Reemplaza con ID real de YouTube
      thumbnail: 'assets/testimonials/maria-thumb.jpg'
    },
    {
      id: 3,
      clientName: 'Carlos Rodríguez',
      company: 'Inmobiliaria XYZ',
      location: 'Cali',
      quote: 'Mi hogar quedó perfecto',
      videoId: 'dQw4w9WgXcQ', // Reemplaza con ID real de YouTube
      thumbnail: 'assets/testimonials/carlos-thumb.jpg'
    },
    {
      id: 4,
      clientName: 'Ana Martínez',
      company: 'Arquitectura Plus',
      location: 'Barranquilla',
      quote: 'Recomiendo totalmente el servicio',
      videoId: 'dQw4w9WgXcQ', // Reemplaza con ID real de YouTube
      thumbnail: 'assets/testimonials/ana-thumb.jpg'
    }
  ];

  ngOnInit() {
    this.maxSlides = Math.max(0, this.testimonials.length - 3);
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Cambia cada 4 segundos
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Vuelve al inicio
    }
  }

  playVideo(videoId: string) {
    // Abrir video de YouTube en nueva pestaña
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }
}
