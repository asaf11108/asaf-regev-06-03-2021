import { Directive, ElementRef, EventEmitter, Output, OnInit, Renderer2, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Directive({
  selector: '[favoritesToggle]'
})
export class FavoritesToggleDirective implements OnInit, OnChanges {
  @Output() addFavorites = new EventEmitter<void>();
  @Output() removeFavorites = new EventEmitter<void>();
  @Input('favoritesToggle') exist: boolean = false;
  ADD_FAVORITES_TEXT = this.renderer.createText('Add to favorites');
  REMOVE_FAVORITES_TEXT = this.renderer.createText('Remove from favorites');
  toggleSpan: any;
  isInit = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges({ exist }: SimpleChanges): void {
    if (!this.isInit) {
      this.changeToggle(exist.currentValue);
    }
    this.isInit = false;
  }

  ngOnInit(): void {
    this.toggleSpan = this.renderer.createElement('span');
    this.changeToggle(this.exist);
    this.renderer.appendChild(this.elementRef.nativeElement, this.toggleSpan);
  }

  @HostListener('click')
  toggleFavorites() {
    this.exist ? this.removeFavorites.emit() : this.addFavorites.emit();
    this.changeToggle(!this.exist);
  }

  changeToggle(exist: boolean): void {
    if (this.toggleSpan) {
      this.renderer.removeChild(this.toggleSpan, this.REMOVE_FAVORITES_TEXT);
      this.renderer.removeChild(this.toggleSpan, this.ADD_FAVORITES_TEXT);
    }
    this.exist = exist;
    this.renderer.appendChild(this.toggleSpan, this.exist ? this.REMOVE_FAVORITES_TEXT : this.ADD_FAVORITES_TEXT);
  }

}
