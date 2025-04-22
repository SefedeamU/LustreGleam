import { Injectable } from '@angular/core';
import { UserRegister } from '@shared/models/userRegister.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  register(user: UserRegister): void {
    console.log('Registrando usuario:', user);
    // Aquí iría la lógica para conectar con la API
    // Por ejemplo, usando HttpClient para enviar los datos
  }
}