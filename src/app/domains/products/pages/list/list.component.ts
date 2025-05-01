import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';


import { ProductsComponent } from '@products/components/products/products.component';
import { Product } from "@shared/models/product.model";
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [ProductsComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  cartService = inject(CartService);
  productService = inject(ProductService);

  @Input() categoryId?: number; // Recibimos el id de la categoría desde el router

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['category_id'] || undefined; // Obtiene el category_id de la URL
      this.productService.loadProducts(this.categoryId); // Llama al servicio para cargar los productos
    });
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
    const product = this.productService.products().find(p => p.id === productId);
    if (product) {
      product.rating = newRating;
    }
  }
  private getProducts() {
    this.productService.loadProducts(this.categoryId)
  }
}