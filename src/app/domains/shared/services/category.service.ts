import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  categories = signal<Category[]>([]); // Signal para almacenar las categorías

  readonly url = environment.api_productos;

  constructor() { }

  loadCategories() {
    this.http.get<Category[]>(`${this.url}/categorias`)
      .subscribe({
        next: (categories) => {
          // Nombres de imágenes en el orden deseado
          const imagenes = [
            'tecnologia.jpg','ropa.jpg', 'calzado.jpg', 'hogar.jpg', 'deportes.jpg', 'libros.jpg',
            'muebles.jpg', 'cocina.jpg', 'juguetes.jpg',   'accesorios.jpg'
          ];
          // Asignar el campo img a cada categoría
          const categoriesConImg = categories.map((cat, idx) => ({
            ...cat,
            img: imagenes[idx] || 'default.jpg'
          }));
          this.categories.set(categoriesConImg); // Actualiza las categorías en el signal
        },
        error: (error) => {
          console.error('Error al cargar las categorías:', error);
        }
    });
  }
}
