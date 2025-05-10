import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from './environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  products = signal<Product[]>([]); // Signal para almacenar los productos
  readonly url = environment.api_productos;
  totalPages = signal(1);
  currentPage = signal(0);

  constructor() { }

  // Cargar productos desde la API
  loadProducts(categoryId?: number, page: number = 0, size: number = 10) {
    let url: string;
    if (categoryId) {
      // Endpoint para filtrar por categoría
      url = `${this.url}/productos/categoria?categoriaId=${categoryId}&page=${page}&size=${size}`;
    } else {
      // Endpoint general
      url = `${this.url}/productos?page=${page}&size=${size}`;
    }
    this.http.get<{ content: Product[], totalPages: number, number: number }>(url).subscribe({
      next: (response) => {
        this.products.set(response.content);
        this.totalPages.set(response.totalPages);
        this.currentPage.set(response.number);
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }


  // Obtener un producto por su ID
  getProductById(id: number) {
    return this.http.get<Product>(`http://${this.url}/productos/${id}`);
  }

  get hasMore(): boolean {
    return this.currentPage() < this.totalPages() - 1;
  }
}
