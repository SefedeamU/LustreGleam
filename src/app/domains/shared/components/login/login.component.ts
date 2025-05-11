import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { CartService } from '@shared/services/cart.service';
import { LoginDto, User } from '@shared/models/auth.model';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    ]),
    trigger('shake', [
      transition(':enter', [
        animate(
          '500ms',
          style({ transform: 'translateX(0)' })
        ),
        animate(
          '50ms',
          style({ transform: 'translateX(-10px)' })
        ),
        animate(
          '50ms',
          style({ transform: 'translateX(10px)' })
        ),
        animate(
          '50ms',
          style({ transform: 'translateX(-10px)' })
        ),
        animate(
          '50ms',
          style({ transform: 'translateX(0)' })
        )
      ])
    ]),
    trigger('modalFade', [
      transition(':leave', [
        animate('300ms ease', style({ opacity: 0 }))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 }))
      ])
    ]),
    trigger('formFade', [
      transition(':leave', [
        animate('300ms cubic-bezier(.4,0,.2,1)', style({ opacity: 0, transform: 'scale(0.95)' }))
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class LoginComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  user: LoginDto = { mail: '', password: '' };
  errorMessage: string | null = null;
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  displayStatus: typeof this.status = 'idle';
  showModal = true;
  showPassword = false;
  
  private statusTimeout: any = null;

  private setStatus(newStatus: 'idle' | 'loading' | 'success' | 'error', timeoutMs?: number) {
    // Cancelar timeout anterior
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout);
      this.statusTimeout = null;
    }

    // Primero cambia el estado visual (el ícono) a null para que se active :leave
    this.displayStatus = 'idle';

    // Espera el tiempo de salida de animación antes de cambiar el real
    setTimeout(() => {
      this.status = newStatus;
      this.displayStatus = newStatus;

      // Si hay timeout para volver a "idle"
      if (timeoutMs) {
        this.statusTimeout = setTimeout(() => {
          this.setStatus('idle');
        }, timeoutMs);
      }
    }, 300); // este valor debe ser igual a la duración de tu animación :leave (fadeOut)
  }


  async onSubmit(): Promise<void> {
    this.errorMessage = null;
    this.setStatus('loading');

    const delay = new Promise<void>((resolve) => setTimeout(resolve, 1500));

    try {
      const [_, resp]: [void, any] = await Promise.all([
        delay,
        this.authService.login(this.user).toPromise()
      ]);

      localStorage.setItem('token', resp.access_token);
      this.setStatus('success', 2000);

      setTimeout(() => {
      this.showModal = false;
      setTimeout(() => {
        this.authService.closeLoginModal();
      }, 300); // Espera la animación de salida
    }, 1200); // Tiempo que muestras el check
  } catch (err: any) {
      await delay; // ⬅️ ¡espera también los 4 segundos en caso de error!

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



  closeLogin(): void {
    this.showModal = false;
    setTimeout(() => {
      this.authService.closeLoginModal();
    }, 300); // 300ms debe coincidir con la duración de tu animación
  }

  hideCart() {
    this.cartService.hideCartVisivility();
    console.log('Cambio en el carrito detectado!');
  }
}
