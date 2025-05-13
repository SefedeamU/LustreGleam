import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RouterLinkWithHref } from '@angular/router';
import { RegisterDto } from '@shared/models/auth.model';
import { AuthService } from '@shared/services/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLinkWithHref, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
    trigger('fadeInScaleOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class RegisterComponent {
  private authService = inject(AuthService); // Inyectamos el servicio
  private router = inject(Router);

  userConfirmPassword: string = '';
  passwordMismatch = false;
  firstName = '';
  lastName = '';
  user: RegisterDto = {
    name: '',
    mail: '',
    telefono: '',
    password: ''
  };

  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  displayStatus: typeof this.status = 'idle';
  errorMessage: string | null = null;
  private statusTimeout: any = null;

  private setStatus(newStatus: 'idle' | 'loading' | 'success' | 'error', timeoutMs?: number) {
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout);
      this.statusTimeout = null;
    }
    this.displayStatus = 'idle';
    setTimeout(() => {
      this.status = newStatus;
      this.displayStatus = newStatus;
      if (timeoutMs) {
        this.statusTimeout = setTimeout(() => {
          this.setStatus('idle');
        }, timeoutMs);
      }
    }, 300);
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = null;
    if (this.user.password !== this.userConfirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;
    this.setStatus('loading');

    const delay = new Promise<void>((resolve) => setTimeout(resolve, 1700));
    try {
      this.user.name = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
      const [_, resp]: [void, any] = await Promise.all([
        delay,
        this.authService.register(this.user).toPromise()
      ]);
      // Guarda el token y autentica al usuario
      this.authService.setAuthenticated(true);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('usuario_id', resp.id);
      localStorage.setItem('user_rol', resp.rol);
      this.setStatus('success', 1200);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1200);
    } catch (err: any) {
      await delay;
      let apiMsg = '';
      if (err.error) {
        if (typeof err.error === 'string') {
          try {
            const parsed = JSON.parse(err.error);
            apiMsg = parsed.message || parsed.detail || err.message;
          } catch {
            apiMsg = err.message || 'Ocurrió un error inesperado. Intenta nuevamente.';
          }
        } else {
          apiMsg = err.error.message || err.error.detail || err.message;
        }
      } else {
        apiMsg = err.message || 'Ocurrió un error inesperado. Intenta nuevamente.';
      }
      this.errorMessage = apiMsg;
      this.setStatus('error', 2000);
    }
  }
}
