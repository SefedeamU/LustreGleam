import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from '@products/components/products/products.component';
import { Product } from "@shared/models/product.model";
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductsComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]> ([]);
  cart = signal<Product[]> ([]);

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  ngOnInit() {
    this.productService.getProducts()
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });

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
