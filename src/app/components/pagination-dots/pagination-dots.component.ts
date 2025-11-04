import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-dots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-dots.component.html',
  styleUrls: ['./pagination-dots.component.css'],
})
export class PaginationDotsComponent {
  @Input() count = 0; // cantidad total de puntos
  @Input() active = 0; // índice del punto activo
  @Input() ariaLabel = 'Ir al slide';
  @Output() select = new EventEmitter<number>(); // emite el índice seleccionado

  get items(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }

  onSelect(index: number) {
    this.select.emit(index);
  }
}
