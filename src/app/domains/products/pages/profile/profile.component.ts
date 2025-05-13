import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '@shared/services/usuarios.service';
import { User } from '@shared/models/auth.model';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private usuarioService = inject(UsuariosService);

  user: User | null = null;
  errorMessage: string | null = null;
  loading = true;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('usuario_id');

    if (token && id) {
      this.usuarioService.getUserById(+id, token).subscribe({
        next: (data: User) => {
          this.user = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'No se pudo cargar la información del perfil';
          console.error('Error al obtener el usuario:', error);
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'No se encontró sesión activa.';
      this.loading = false;
    }
  }
}
