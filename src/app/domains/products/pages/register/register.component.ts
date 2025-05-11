import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterLinkWithHref } from '@angular/router';
import { RegisterDto } from '@shared/models/auth.model';
import { AuthService } from '@shared/services/auth.service';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLinkWithHref, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService); // Inyectamos el servicio

  userConfirmPassword: string = '';
  passwordMismatch = false;

  user: RegisterDto = {
    name: '',
    mail: '',
    telefono: '',
    password: ''
  };

  onSubmit(): void {
    if(this.user.password !== this.userConfirmPassword) {
      console.log('Formulario enviado:', this.user);
      this.authService.register(this.user);
    }
    this.passwordMismatch = false;
  }

}
