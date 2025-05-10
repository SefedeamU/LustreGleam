import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';


import { ProductsComponent } from '@products/components/products/products.component';
import { Product } from "@shared/models/product.model";
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-list',
  imports: [ProductsComponent, RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  cartService = inject(CartService);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  currentPage = 0;
  pageSize = 20;


  @Input() categoryId?: number; // Recibimos el id de la categoría desde el router
  currentCategory = signal<Category | null>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['category_id'] || undefined;
      this.currentPage = 0;
      this.getProducts();
      this.loadCategoryInfo();
    });
  }

  private loadCategoryInfo() {
    const all = this.categoryService.categories();
    const found = all.find(c => c.id === this.categoryId);
    this.currentCategory.set(found || null);
  }

  ngOnChanges(changes: SimpleChanges) {
    const categoryId = changes['categoryId'];
    if(categoryId){
      this.currentPage = 0; // Reinicia a la primera página al cambiar de categoría
      this.getProducts()
    }
  }

  addToCart(product: Product) {
    console.log('Estamos agregando un producto desde el hijo!');
    this.cartService.addProduct(product);
  }

  removeToCart(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.cartService.cart.update((prevState) => prevState.filter(item => item.id_producto !== product.id_producto)); // Eliminamos del carrito en el servicio
  }
/*
  fromChildRating(newRating: number, productId: number) {
    console.log(`Nuevo rating para el producto con ID ${productId}: ${newRating}`);
    const product = this.productService.products().find(p => p.id === productId);
    if (product) {
      product.rating = newRating;
    }
  }
    */
  private getProducts() {
  this.productService.loadProducts(this.categoryId, this.currentPage, this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.productService.totalPages()) {
      this.currentPage = page;
      this.getProducts();
    }
  }

  nextPage() {
    this.currentPage++;
    this.getProducts();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getProducts();
    }
  }
}



