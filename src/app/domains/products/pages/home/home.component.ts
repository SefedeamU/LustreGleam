import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Product } from "@shared/models/product.model";
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  
  products = signal<Product[]> ([]);
  
  categoryService = inject(CategoryService);

  private productService = inject(ProductService);
  @Input() categoryId?: number; // Recibimos el id de la categoría desde el router

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['category_id'] || undefined; // Obtiene el category_id de la URL
      this.getProducts(); // Actualiza los productos filtrados
    });
    this.categoryService.loadCategories(); // Llama al servicio para cargar las categorías
  }

  
  ngOnChanges(changes: SimpleChanges) {
    const categoryId = changes['categoryId'];
    if(categoryId){
      this.getProducts()
    }
  }

  private getProducts() {
    this.productService.loadProducts(this.categoryId)
  }
}
