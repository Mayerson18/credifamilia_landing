import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.css'
})
export class CtaButtonComponent {
  @Input() buttonText: string = 'Solicítalo aquí';
  @Input() isMobile: boolean = false;
  @Input() buttonType: 'button' | 'submit' = 'button';
  @Input() customClass: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  handleClick() {
    const ctaSection = document.querySelector('app-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.buttonClick.emit();
  }
}

