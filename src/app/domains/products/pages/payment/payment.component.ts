import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '@shared/services/cart.service';
import { FacturaService } from '@shared/services/factura.service';
import { AuthService } from '@shared/services/auth.service';
import { Product } from '@shared/models/product.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  animations: [
    trigger('dropToCart', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('removeFromCart', [
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(40px)', opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class PaymentComponent {
  private cartService = inject(CartService);
  private facturaService = inject(FacturaService);
  private router = inject(Router);

  cart = this.cartService.cart;
  total = this.cartService.total;

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  confirmarPago() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      this.errorMessage = 'Debe iniciar sesión para realizar el pago.';
      return;
    }

    const productos = this.cart().map(p => {
      if (!p.id_producto || !p.quantity) {
        console.error('Producto inválido detectado:', p);
      }
      return {
        id: p.id_producto,
        cantidad: p.quantity
      };
    });

    const payload = {
      usuario_id: +userId,
      productos,
      fecha: new Date().toISOString()
    };

    console.log('Enviando payload a la API:', payload); // <-- 💥 CLAVE

    this.isSubmitting = true;
    this.facturaService.crearFactura(payload).subscribe({
      next: () => {
        this.successMessage = '¡Pago realizado con éxito! Gracias por su compra.';
        this.cartService.cart.set([]); // Vaciar carrito
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        console.error('Error HTTP al crear factura:', err); // <-- LOG DETALLADO
        if (err.status === 422) {
          this.errorMessage = 'Error en los datos enviados. Revisa los productos y vuelve a intentar.';
        } else {
          this.errorMessage = 'Error al procesar el pago. Intente nuevamente.';
        }
        this.isSubmitting = false;
      }
    });
  }

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  onPay() {
    alert('Gracias por tu compra! 🧾 Se ha procesado correctamente.');
    // Aquí podrías emitir un evento, redirigir o iniciar un flujo de pago real
    this.cartService.cart.set([]); // Vacía el carrito
  }

    trackById(index: number, item: Product) {
    return item.id_producto;
  }
}
