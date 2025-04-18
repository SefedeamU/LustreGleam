import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from "./../../../shared/models/product.model";

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();
  @Output() ratingChange = new EventEmitter<number>();

  addToCartHandler() {
    console.log('Click desde el hijo detectado!');
    this.addToCart.emit("Hola este es un mensaje desde el hijo: " + this.product.title);
  }

  setRating(newRating: number) {
    this.product.rating = newRating;
    this.ratingChange.emit(this.product.rating);
  }

}
