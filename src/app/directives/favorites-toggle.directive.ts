import { Directive, ElementRef, EventEmitter, Output, OnInit, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[favoritesToggle]'
})
export class FavoritesToggleDirective implements OnInit {
  @Output() addFavorites = new EventEmitter<void>();
  @Output() removeFavorites = new EventEmitter<void>();
  toggle: boolean;
  ADD_FAVORITES_TEXT = this.renderer.createText('Add to favorites');
  REMOVE_FAVORITES_TEXT = this.renderer.createText('Remove from favorites');
  toggleSpan: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.toggle = true;
    this.toggleSpan = this.renderer.createElement('span');
    this.renderer.appendChild(this.toggleSpan, this.ADD_FAVORITES_TEXT);
    this.renderer.appendChild(this.elementRef.nativeElement, this.toggleSpan);
  }

  @HostListener('click')
  toggleFavorites() {
    this.renderer.removeChild(this.toggleSpan, this.toggle ? this.ADD_FAVORITES_TEXT : this.REMOVE_FAVORITES_TEXT);
    this.toggle ? this.addFavorites.emit() : this.removeFavorites.emit();
    this.toggle = !this.toggle;
    this.renderer.appendChild(this.toggleSpan, this.toggle ? this.ADD_FAVORITES_TEXT : this.REMOVE_FAVORITES_TEXT);
  }

}
