import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './../../components/products/products.component';
import { Product } from "./../../../shared/models/product.model";
import { HeaderComponent } from './../../../shared/components/header/header.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductsComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]> ([]);
  cart = signal<Product[]> ([]);

  constructor() {
    const initProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 12, img: 'https://picsum.photos/640/640?r=0', description: 'Description 1', rating: 0, creationAt: new Date().toISOString() },
      { id: 2, title: 'Product 2', price: 15, img: 'https://picsum.photos/640/640?r=2', description: 'Description 2', rating: 0, creationAt: new Date().toISOString() },
      { id: 3, title: 'Product 2', price: 15, img: 'https://picsum.photos/640/640?r=2', description: 'Description 2', rating: 0, creationAt: new Date().toISOString() },
      { id: 4, title: 'Product 3', price: 20, img: 'https://picsum.photos/640/640?r=4', description: 'Description 3', rating: 0, creationAt: new Date().toISOString() },
      { id: 5, title: 'Product 4', price: 25, img: 'https://picsum.photos/640/640?r=6', description: 'Description 4', rating: 0, creationAt: new Date().toISOString() },
      { id: 6, title: 'Product 5', price: 30, img: 'https://picsum.photos/640/640?r=8', description: 'Description 5', rating: 0, creationAt: new Date().toISOString() }
    ];
    this.products.set(initProducts);
  }

  addToCart(product: Product){
    console.log('Estamos agregando un producto desde el hijo!');
    this.cart.update((prevState) => [...prevState, product]);
  }

  removeToCart(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.cart.update((prevState) => prevState.filter(item => item.id !== product.id));
  }

  fromChildRating(newRating: number, productId: number) {
    console.log(`Nuevo rating para el producto con ID ${productId}: ${newRating}`);
    const product = this.products().find(p => p.id === productId);
    if (product) {
      product.rating = newRating;
    }
  }

}
