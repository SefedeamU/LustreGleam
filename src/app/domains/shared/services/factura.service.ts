import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@shared/services/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);
  private apiUrl = environment.api_facturas;

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearFactura(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/factura`, data, {
      headers: this.getAuthHeaders()
    });
  }

  obtenerFacturas(params?: { skip?: number; limit?: number; usuario_id?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.skip !== undefined) httpParams = httpParams.set('skip', params.skip);
      if (params.limit !== undefined) httpParams = httpParams.set('limit', params.limit);
      if (params.usuario_id !== undefined) httpParams = httpParams.set('usuario_id', params.usuario_id);
    }
    return this.http.get(`${this.apiUrl}/facturas`, {
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  obtenerFacturaPorId(facturaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/factura/${facturaId}`, {
      headers: this.getAuthHeaders()
    });
  }

  modificarFactura(facturaId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/factura/${facturaId}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  borrarFactura(facturaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/factura/${facturaId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
