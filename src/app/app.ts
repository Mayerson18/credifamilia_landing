import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { BenefitsComponent } from './components/benefits/benefits';
import { ProcessComponent } from './components/process/process';
import { CtaComponent } from './components/cta/cta';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { FaqComponent } from './components/faq/faq';
import { PartnersComponent } from './components/partners/partners';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    BenefitsComponent,
    ProcessComponent,
    CtaComponent,
    TestimonialsComponent,
    FaqComponent,
    PartnersComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
