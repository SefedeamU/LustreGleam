import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { RouterLinkWithHref } from '@angular/router';

import { Product } from "@shared/models/product.model";
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";
@Component({
  selector: 'app-products',
  imports: [CommonModule, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  animations: [
    trigger('curtainDrop', [
      transition(':enter', [
        animate(
          '1.5s ease-in-out',
          keyframes([
            style({ transform: 'translateY(-100%)', opacity: 0, offset: 0 }),
            style({ transform: 'translateY(0)', opacity: 1, offset: 0.2 }),  // 👈 Baja rápido
            style({ transform: 'translateY(0)', opacity: 1, offset: 0.75 }), // 👈 Se queda más tiempo
            style({ transform: 'translateY(0)', opacity: 0.5, offset: 0.9 }),// 👈 Comienza a desvanecerse
            style({ transform: 'translateY(0)', opacity: 0, offset: 1.0 })   // 👈 Se desvanece del todo
          ])
        )
      ])
    ])
  ]
  
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
