import { Injectable, signal } from '@angular/core';

import { UserLogin } from '@shared/models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showLoginModal = signal(false);
  constructor() {}

  login(user: UserLogin): void {
    console.log('Intentando iniciar sesión con:', user);
    // Aquí iría la lógica para conectar con la API
    // Por ejemplo, usando HttpClient para enviar los datos
  }

  openLoginModal() {
    console.log('Modal abierto');
    console.log(this.showLoginModal());
    this.showLoginModal.set(true);
  }

  closeLoginModal() {
    this.showLoginModal.set(false);
  }
}