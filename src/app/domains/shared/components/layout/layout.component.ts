import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";
import { CartService } from '@shared/services/cart.service'; // 👈 importante
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true
})
export class LayoutComponent {
  cartService = inject(CartService); // 👈 inyectamos el servicio

  // ⬇️ accedemos al signal como getter
  get hideCart() {
    return this.cartService.hideCart();
  }
}
