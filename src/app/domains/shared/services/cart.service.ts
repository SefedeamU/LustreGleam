import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';
import { CartItem } from '../models/cartItem.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<CartItem[]>([]); // Estado del carrito
  total = computed(() =>
    this.cart().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  ); // Total Neto calculado  
  hideCart = signal<boolean>(true); // Estado de visibilidad del carrito

  constructor() {}

  toggleCartVisibility() {
    this.hideCart.update((prevState) => !prevState);
  }

  hideCartVisivility() {
    this.hideCart.set(true);
  }

  resetCartVisibility() {
    this.hideCart.set(true);
  }

  addProduct(product: Product) {
    this.cart.update((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Incrementamos cantidad si ya existe
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  removeProduct(product: Product) {
    this.cart.update((prevCart) => prevCart.filter((item) => item.id !== product.id));
  }

  increaseQuantity(productId: number) {
    this.cart.update(cart =>
      cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }
  
  decreaseQuantity(productId: number) {
    this.cart.update(cart => {
      const item = cart.find(p => p.id === productId);
      if (!item) return cart;
  
      if (item.quantity <= 1) {
        return cart.filter(p => p.id !== productId);
      }
  
      return cart.map(p =>
        p.id === productId
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    });
  }
  
}