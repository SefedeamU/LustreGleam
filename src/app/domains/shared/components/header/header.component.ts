import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref ,RouterLinkActive } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from "@shared/models/product.model";
import { CartService } from '@shared/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoginComponent } from "@shared/components/login/login.component"
import { LoginService } from '@shared/services/login.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkActive, LoginComponent, RouterLinkWithHref],
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
    ]),
    trigger('bounce', [
      transition(':increment', [
        style({ transform: 'translateY(0)' }),
        animate('200ms cubic-bezier(.68,-0.55,.27,1.55)', style({ transform: 'translateY(-12px)' })),
        animate('120ms', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeaderComponent {

  private cartService = inject(CartService); // Inyectamos el servicio
  private loginService = inject(LoginService);
  private bounceSub?: Subscription;

  bounceKey = 0;
  cart = this.cartService.cart; // Obtenemos el carrito del servicio
  hideCart = this.cartService.hideCart; // Obtenemos el estado de visibilidad del carrito
  totalPrice = this.cartService.total; // Obtenemos el total calculado

  isAuthenticated = false;
  showLoginModal = this.loginService.showLoginModal;

  ngOnInit() {
    this.bounceSub = this.cartService.cartBounce$.subscribe(() => {
      this.bounceKey++;
    });
  }

  ngOnDestroy() {
    this.bounceSub?.unsubscribe();
  }

  cartHandler() {
    this.cartService.toggleCartVisibility(); // Cambiamos la visibilidad del carrito
    console.log('Cambio en el carrito detectado!');
  }

  removeFromCart(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.cartService.removeProduct(product); // Llamamos al método del servicio para eliminar el producto
  }

  addToCart(product: Product) {
    console.log('Agregando producto con animación');
    this.cartService.addProduct(product);
  }

  trackById(index: number, item: any) {
    return item.id_producto;
  }


  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }


  checkAuthentication() {
    this.isAuthenticated = false;
  }

  openLoginModal() {
    console.log('Abriendo modal de login desde el header!');
    this.loginService.openLoginModal();
  }
}
