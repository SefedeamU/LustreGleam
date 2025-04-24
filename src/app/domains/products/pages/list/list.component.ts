import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from '@products/components/products/products.component';
import { Product } from "@shared/models/product.model";
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductsComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]> ([]);
  categories = signal<Category[]>([]);
  cartService = inject(CartService);

  @Input() categoryId?: number; // Recibimos el id de la categoría desde el router
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['category_id'] || undefined; // Obtiene el category_id de la URL
      this.getProducts(); // Actualiza los productos filtrados
    });
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const categoryId = changes['categoryId'];
    if(categoryId){
      this.getProducts()
    }
  }

  addToCart(product: Product) {
    console.log('Estamos agregando un producto desde el hijo!');
    this.cartService.addProduct(product);
  }

  removeToCart(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.cartService.cart.update((prevState) => prevState.filter(item => item.id !== product.id)); // Eliminamos del carrito en el servicio
  }

  fromChildRating(newRating: number, productId: number) {
    console.log(`Nuevo rating para el producto con ID ${productId}: ${newRating}`);
    const product = this.products().find(p => p.id === productId);
    if (product) {
      product.rating = newRating;
    }
  }

  private getProducts() {
    this.productService.getProducts(this.categoryId)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  private getCategories() {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    })
  }
}