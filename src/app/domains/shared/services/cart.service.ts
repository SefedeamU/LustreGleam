import { computed, effect, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';
import { CartItem } from '../models/cartItem.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'app_cart_items';

  private loadCartFromStorage(): CartItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  cart = signal<CartItem[]>(this.loadCartFromStorage()); // Estado del carrito
  total = computed(() =>
    this.cart().reduce((sum, item) => sum + (item.precio * item.quantity), 0)
  );// Total Neto calculado
  hideCart = signal<boolean>(true); // Estado de visibilidad del carrito
  cartBounce$ = new Subject<void>();

  constructor() {
    // Suscribirse a cambios en el cart signal y guardarlos automáticamente
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart()));
    });
  }

  toggleCartVisibility() {
    this.hideCart.update((prevState) => !prevState);
  }

  hideCartVisivility() {
    this.hideCart.set(true);
  }

  resetCartVisibility() {
    this.hideCart.set(true);
  }

  addProductWithOverlay(product: Product, showOverlayCallback: (state: boolean) => void) {
  // Agregar el producto al carrito
  this.addProduct(product);

  // Mostrar el overlay
  showOverlayCallback(true);

  // Ocultar el overlay después de 1.5 segundos
  setTimeout(() => {
    showOverlayCallback(false);
  }, 1500);
}

addProduct(product: Product) {
    this.cart.update(prevCart => {
      const existing = prevCart.find(p => p.id_producto === product.id_producto);
      if (existing) {
        return prevCart.map(p =>
          p.id_producto === product.id_producto
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    this.cartBounce$.next();
  }

  removeProduct(product: Product) {
    this.cart.update((prevCart) => prevCart.filter((item) => item.id_producto !== product.id_producto));
  }

  increaseQuantity(productId: number) {
    this.cart.update(cart =>
      cart.map(item =>
        item.id_producto === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number) {
    this.cart.update(cart => {
      const item = cart.find(p => p.id_producto === productId);
      if (!item) return cart;

      if (item.quantity <= 1) {
        return cart.filter(p => p.id_producto !== productId);
      }

      return cart.map(p =>
        p.id_producto === productId
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    });
  }

}
