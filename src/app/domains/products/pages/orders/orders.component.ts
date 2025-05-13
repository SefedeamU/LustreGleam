import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { FacturaService } from '@shared/services/factura.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  facturas: any[] = [];
  loading = true;
  productsLoaded = false;
  error: string | null = null;
  productDetails: { [id: number]: Product } = {};

  // Paginación
  currentPage = 0;
  pageSize = 5;

  constructor(
    private facturaService: FacturaService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas() {
    const userId = localStorage.getItem('usuario_id');
    if (!userId) {
      this.router.navigate(['/']);
      return;
    }
    this.loading = true;
    this.productsLoaded = false;
    this.facturaService.obtenerFacturas({
      usuario_id: Number(userId),
      skip: this.currentPage * this.pageSize,
      limit: this.pageSize
    }).subscribe({
      next: (resp) => {
        this.facturas = Array.isArray(resp) ? resp : (resp.facturas || []);
        this.loadProductDetails();
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las facturas.';
        this.loading = false;
      }
    });
  }

  nextPage() {
    // Si la página actual tiene menos de pageSize, ya no hay más páginas
    if (this.facturas.length === this.pageSize) {
      this.currentPage++;
      this.loadFacturas();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadFacturas();
    }
  }

  private loadProductDetails() {
    const productIds = new Set<number>();
    this.facturas.forEach(factura => {
      factura.productos.forEach((prod: any) => {
        productIds.add(prod.id_prod);
      });
    });

    if (productIds.size === 0) {
      this.productsLoaded = true;
      this.loading = false;
      return;
    }

    let loaded = 0;
    productIds.forEach(id => {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.productDetails[id] = product;
          loaded++;
          if (loaded === productIds.size) {
            this.productsLoaded = true;
            this.loading = false;
          }
        },
        error: () => {
          this.productDetails[id] = {
            id_producto: id,
            nombre: 'Producto no disponible',
            direccion: '',
            precio: 0,
            stock: 0,
            imagen_url: 'https://via.placeholder.com/60',
            fecha_creacion: '',
            proveedor: '',
            categorias: [],
          };
          loaded++;
          if (loaded === productIds.size) {
            this.productsLoaded = true;
            this.loading = false;
          }
        }
      });
    });
  }
}
