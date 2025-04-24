import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterLinkWithHref } from '@angular/router';

import { LoginService } from '@shared/services/login.service';
import { UserLogin } from '@shared/models/userLogin.model';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginService = inject(LoginService); // Inyectamos el servicio
  private cartService = inject(CartService);

  user: UserLogin = { email: '', password: '' }; // Inicializamos el modelo

  onSubmit(): void {
    console.log('Formulario enviado:', this.user);
    this.loginService.login(this.user); // Llama al servicio para manejar el inicio de sesión
  }

  closeLogin(): void {
    this.loginService.closeLoginModal(); // Llama al servicio para cerrar el modal
  }

  hideCart(){
    this.cartService.hideCartVisivility(); // Cambiamos la visibilidad del carrito
    console.log('Cambio en el carrito detectado!');
  }
}