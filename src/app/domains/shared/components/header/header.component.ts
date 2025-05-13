import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref ,RouterLinkActive, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from "@shared/models/product.model";
import { CartService } from '@shared/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoginComponent } from "@shared/components/login/login.component"
import { AuthService } from '@shared/services/auth.service';

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
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ])
  ]
})
export class HeaderComponent {

  private cartService = inject(CartService); // Inyectamos el servicio
  private authService = inject(AuthService);
  private bounceSub?: Subscription;

  isDropdownOpen = false;
  bounceKey = 0;
  cart = this.cartService.cart; // Obtenemos el carrito del servicio
  hideCart = this.cartService.hideCart; // Obtenemos el estado de visibilidad del carrito
  totalPrice = this.cartService.total; // Obtenemos el total calculado

  showLoginModal = this.authService.showLoginModal;
  isAuthenticated = this.authService.isAuthenticated;

  router = inject(Router);

  ngOnInit() {
    this.bounceSub = this.cartService.cartBounce$.subscribe(() => {
      this.bounceKey++;
    });
  }

  ngOnDestroy() {
    this.bounceSub?.unsubscribe();
  }

  procederAlPago() {
    if (!this.isAuthenticated()) {
      this.openLoginModal();
      return;
    }
    this.cartHandler(); // Colapsa el carrito
    this.router.navigate(['/payment']);
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

  openLoginModal() {
    console.log('Abriendo modal de login desde el header!');
    this.authService.openLoginModal();
  }

  logout() {
    this.authService.setAuthenticated(false);
    console.log('Sesión cerrada');
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

    closeDropdown() {
    this.isDropdownOpen = false;
  }

  // Cierra al hacer clic fuera
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeDropdown();
    }
  }
}
