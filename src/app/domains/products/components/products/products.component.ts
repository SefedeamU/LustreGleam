import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from "@shared/models/product.model";
import {ReversePipe} from "@shared/pipes/reverse.pipe"
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";
@Component({
  selector: 'app-products',
  imports: [CommonModule, ReversePipe, TimeAgoPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();
  @Output() ratingChange = new EventEmitter<number>();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }

  setRating(newRating: number) {
    this.product.rating = newRating;
    this.ratingChange.emit(this.product.rating);
  }

}
