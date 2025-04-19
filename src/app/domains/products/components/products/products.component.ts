import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from "@shared/models/product.model";
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";
@Component({
  selector: 'app-products',
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();
  @Output() ratingChange = new EventEmitter<number>();

  showOverlay = false;

  addToCartHandler() {
    this.addToCart.emit(this.product);

    this.showOverlay = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 1500); // Cambia el tiempo según tus necesidades
  }

  setRating(newRating: number) {
    this.product.rating = newRating;
    this.ratingChange.emit(this.product.rating);
  }

}
