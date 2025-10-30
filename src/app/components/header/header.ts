import { Component } from '@angular/core';
import { CtaButtonComponent } from '../cta-button/cta-button';

@Component({
  selector: 'app-header',
  imports: [CtaButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToForm() {
    const ctaSection = document.querySelector('app-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMobileMenuOpen = false;
  }
}