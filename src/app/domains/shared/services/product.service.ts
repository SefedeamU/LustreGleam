import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  products = signal<Product[]>([]); // Signal para almacenar los productos

  constructor() { }

  // Cargar productos desde la API
  loadProducts(categoryId?: number) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId.toString());
    }
    this.http.get<Product[]>(url.toString()).subscribe({
      next: (products) => {
        this.products.set(products); // Actualiza los productos en el signal
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  // Obtener un producto por su ID
  getProductById(id: number) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}