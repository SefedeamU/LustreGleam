import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
    
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  /*updateRating(productId: number, rating: number): Observable<void> {
  }*/
}