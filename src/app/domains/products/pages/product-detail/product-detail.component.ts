import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';

import { ProductService } from '@shared/services/product.service';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private productService = inject(ProductService);
  @Input() id?:number;
  product = signal<Product | null>(null);

  ngOnInit() {
    if (this.id) {
      this.productService.getProductById(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          console.log('Product fetched successfully:', product);
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        }
      });
    }
  }
  
}
