import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart = signal(<Product[]> ([])); 
  total = computed(() => {
    return this.cart().reduce((total, product) => total + product.price, 0);
  })

  constructor() { }

  
}
