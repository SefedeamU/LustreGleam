import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@shared/services/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);
  private apiUrl = environment.api_facturas + '/factura';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // 1. Crear una nueva factura
  crearFactura(data: any): Observable<any> {
    // user_id debe ir en el body
    return this.http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  // 2. Listar todas las facturas o filtrar por usuario
  obtenerFacturas(params?: { skip?: number; limit?: number; usuario_id?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.skip !== undefined) httpParams = httpParams.set('skip', params.skip);
      if (params.limit !== undefined) httpParams = httpParams.set('limit', params.limit);
      if (params.usuario_id !== undefined) httpParams = httpParams.set('usuario_id', params.usuario_id);
    }
    return this.http.get(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  // 3. Obtener una factura por ID
  obtenerFacturaPorId(facturaId: string, usuario_id: number): Observable<any> {
    const params = new HttpParams().set('usuario_id', usuario_id);
    return this.http.get(`${this.apiUrl}/${facturaId}`, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  // 4. Modificar una factura por ID
  modificarFactura(facturaId: string, data: any): Observable<any> {
    // usuario_id debe ir en el body
    return this.http.put(`${this.apiUrl}/${facturaId}`, data, {
      headers: this.getAuthHeaders()
    });
  }


  // 5. Eliminar una factura por ID
    borrarFactura(facturaId: string, user_id: number): Observable<any> {
      // user_id debe ir como query param
      const params = new HttpParams().set('user_id', user_id);
      return this.http.delete(`${this.apiUrl}/${facturaId}`, {
        headers: this.getAuthHeaders(),
        params
      });
  }
}
