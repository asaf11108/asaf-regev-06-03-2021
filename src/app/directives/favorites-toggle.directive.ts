import { Directive, ElementRef, EventEmitter, Output, OnInit, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[favoritesToggle]'
})
export class FavoritesToggleDirective implements OnInit {
  @Output() addFavorites = new EventEmitter<void>();
  @Output() removeFavorites = new EventEmitter<void>();
  exist: boolean;
  ADD_FAVORITES_TEXT = this.renderer.createText('Add to favorites');
  REMOVE_FAVORITES_TEXT = this.renderer.createText('Remove from favorites');
  toggleSpan: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.exist = false;
    this.toggleSpan = this.renderer.createElement('span');
    this.renderer.appendChild(this.toggleSpan, this.ADD_FAVORITES_TEXT);
    this.renderer.appendChild(this.elementRef.nativeElement, this.toggleSpan);
  }

  @HostListener('click')
  toggleFavorites() {
    this.exist ? this.removeFavorites.emit() : this.addFavorites.emit();
    this.changeToggle(!this.exist);
  }

  changeToggle(exist: boolean): void {
    this.renderer.removeChild(this.toggleSpan, this.exist ? this.REMOVE_FAVORITES_TEXT : this.ADD_FAVORITES_TEXT);
    this.exist = exist;
    this.renderer.appendChild(this.toggleSpan, this.exist ? this.REMOVE_FAVORITES_TEXT : this.ADD_FAVORITES_TEXT);
  }

}
