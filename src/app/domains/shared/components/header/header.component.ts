import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { Product } from "@shared/models/product.model";
import { CartService } from '@shared/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('dropToCart', [
      transition(':enter', [
        style({
          transform: 'translateY(-50px)',
          opacity: 0
        }),
        animate('0.2s ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ]),
    trigger('removeFromCart', [
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1
        }),
        animate('0.2s ease-in', style({
          transform: 'translateX(50px)', // Se mueve hacia la derecha
          opacity: 0 // Se desvanece
        }))
      ])
    ])
  ]
})
export class HeaderComponent {

  private cartService = inject(CartService); // Inyectamos el servicio

  cart = this.cartService.cart; // Obtenemos el carrito del servicio
  hideCart = this.cartService.hideCart; // Obtenemos el estado de visibilidad del carrito
  totalPrice = this.cartService.total; // Obtenemos el total calculado


  cartHandler() {
    this.cartService.toggleCartVisibility(); // Cambiamos la visibilidad del carrito
    console.log('Cambio en el carrito detectado!');
  }

  onRemove(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.cartService.removeProduct(product); // Llamamos al método del servicio para eliminar el producto
  }

  addToCart(product: Product) {
    console.log('Agregando producto con animación');
    this.cartService.cart.update((prev) => [...prev, product]); // Actualizamos el carrito en el servicio
  }
}