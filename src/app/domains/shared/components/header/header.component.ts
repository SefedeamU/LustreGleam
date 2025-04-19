import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterLinkActive} from '@angular/router';

import { Product } from "@shared/models/product.model";
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
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
}