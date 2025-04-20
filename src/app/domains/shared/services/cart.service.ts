import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([]); // Estado del carrito
  total = computed(() => this.cart().reduce((total, product) => total + product.price, 0)); // Total calculado
  hideCart = signal<boolean>(true); // Estado de visibilidad del carrito

  constructor() {}

  toggleCartVisibility() {
    this.hideCart.update((prevState) => {
      console.log('Estado de hideCart cambiado:', !prevState);
      return !prevState;
    });
  }

  resetCartVisibility() {
    this.hideCart.set(true); // Ocultamos el carrito
    console.log('El carrito ha sido ocultado al cambiar de página.');
  }

  removeProduct(product: Product) {
    this.cart.update((prevCart) => prevCart.filter((item) => item.id !== product.id));
    console.log(`Producto eliminado: ${product.title}`);
  }

}