import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Product } from "@shared/models/product.model";
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { CommonModule } from '@angular/common';
import { Carousel } from 'flowbite';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  currentSlide = 0;
  slideInterval: any;
  direction: 'next' | 'prev' = 'next';

  products = signal<Product[]> ([]);

  categoryService = inject(CategoryService);

  private productService = inject(ProductService);
  @Input() categoryId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['id'] || undefined; // Obtiene el category_id de la URL
      this.getProducts(); // Actualiza los productos filtrados
    });
    this.categoryService.loadCategories(); // Llama al servicio para cargar las categorías
    this.startAutoSlide();
  }


  ngOnChanges(changes: SimpleChanges) {
    const categoryId = changes['categoryId'];
    if(categoryId){
      this.getProducts()
    }
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  private getProducts() {
    this.productService.loadProducts(this.categoryId)
  }

  get categories() {
    return this.categoryService.categories();
  }

  showSlide(index: number) {
    const total = this.categories.length;
    this.currentSlide = (index + total) % total;
    this.resetAutoSlide(); // <-- Reinicia el temporizador al cambiar manualmente
  }

  nextSlide() {
    this.direction = 'next';
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.direction = 'prev';
    this.showSlide(this.currentSlide - 1);
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4800);
  }

  resetAutoSlide() {
    clearInterval(this.slideInterval);
    this.startAutoSlide();
  }

}
