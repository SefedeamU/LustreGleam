import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private http = inject(HttpClient);
  categories = signal<Category[]>([]); // Signal para almacenar las categorías

  constructor() { }

  loadCategories() {
    this.http.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
      .subscribe({
        next: (categories) => {
          this.categories.set(categories); // Actualiza las categorías en el signal
        },
        error: (error) => {
          console.error('Error al cargar las categorías:', error);
        }
      });
  }
}