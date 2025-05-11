import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from './environment';
import { Observable } from 'rxjs';

import { RegisterDto, LoginDto } from '@shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  showLoginModal = signal(false);
  private http = inject(HttpClient);

  readonly url = environment.api_orquestador;

  // Registro de usuario
  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.url}/usuarios/register`, data);
  }


  login(data: LoginDto): Observable<{ access_token: string; token_type: string }> {
    return this.http.post<{ access_token: string; token_type: string }>(`${this.url}/usuarios/login`, data);
  }

  openLoginModal() {
    this.showLoginModal.set(true);
  }

  closeLoginModal() {
    this.showLoginModal.set(false);
  }
}
