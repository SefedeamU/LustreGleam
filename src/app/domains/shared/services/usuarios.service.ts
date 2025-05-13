import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = environment.api_orquestador + '/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener usuario por ID
  getUserById(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'usuario_id': id.toString()
    });
    const url = `${this.apiUrl}/${id}`;
    console.log('[UsuariosService] GET usuario por ID');
    console.log('URL:', url);
    console.log('Headers:', headers);
    return this.http.get(url, { headers });
  }

  // Actualizar usuario
  updateUser(id: number, data: { nombre: string, email: string, password: string }, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'usuario_id': id.toString()
    });
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  // Eliminar usuario
  deleteUser(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'usuario_id': id.toString()
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // Agregar o actualizar dirección
  updateAddress(id: number, direccion: { direccion: string, ciudad: string, pais: string, codigo_postal: string }, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'usuario_id': id.toString()
    });
    return this.http.post(`${this.apiUrl}/${id}/address`, direccion, { headers });
  }
}
