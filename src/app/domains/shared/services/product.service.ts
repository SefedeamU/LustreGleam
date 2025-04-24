import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(categoryId?: number) {
    const url = new URL('https://api.escuelajs.co/api/v1/products')
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId.toString())
    }
    return this.http.get<Product[]>(url.toString());
  }

  getProductById(id: number) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
