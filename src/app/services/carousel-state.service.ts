import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarouselStateService {
  // índice actual del slide
  private _currentSlide$ = new BehaviorSubject<number>(0);
  currentSlide$ = this._currentSlide$.asObservable();

  // cantidad de slides (para que Services sepa cuántos dots renderizar)
  private _slidesLength$ = new BehaviorSubject<number>(0);
  slidesLength$ = this._slidesLength$.asObservable();

  setCurrentSlide(index: number) {
    this._currentSlide$.next(index);
  }

  setSlidesLength(length: number) {
    this._slidesLength$.next(length);
  }

  get current(): number {
    return this._currentSlide$.getValue();
  }
}
