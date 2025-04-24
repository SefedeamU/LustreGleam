import { Component, inject } from '@angular/core';
import { RegisterService } from '@shared/services/register.service';
import { UserRegister } from '@shared/models/userRegister.model';
import { FormsModule } from '@angular/forms';

import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLinkWithHref],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private registerService = inject(RegisterService); // Inyectamos el servicio

  user: UserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: ''
  };

  onSubmit(): void {
    console.log('Formulario enviado:', this.user);
    this.registerService.register(this.user); // Llama al servicio para manejar el registro
  }
}