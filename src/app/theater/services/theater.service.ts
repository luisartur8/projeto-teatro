import { Injectable } from '@angular/core';
import { Theater } from '../models/theater.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { parseDateMask } from 'src/app/core/constants/mask.constants';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  private readonly API_URL = 'http://localhost:3000/theater';

  constructor(private http: HttpClient) { }

  getById(theaterId: string) {
    return this.http.get<Theater>(`${this.API_URL}/${theaterId}`);
  }

  getList() {
    return this.http.get<Theater[]>(this.API_URL);
  }
  getPaginatedList(page: number, limit: number, order: 'asc' | 'desc') {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('order', order);

    return this.http.get<Theater[]>('http://localhost:3000/theater', { params });
  }
  private add(theater: Theater) {
    return this.http.post<Theater>(this.API_URL, theater);
  }

  private update(theater: Theater) {
    return this.http.put<Theater>(`${this.API_URL}/${theater.id}`, theater);
  }

  save(theater: Theater) {
    let foundation: string | null = null;

    if (theater.foundation instanceof Date) {
      foundation = theater.foundation.toISOString().split('T')[0];
    } else if (typeof theater.foundation === 'string' && theater.foundation.includes('/')) {
      const [day, month, year] = theater.foundation.split('/');
      if (day && month && year) {
        foundation = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    } else if (typeof theater.foundation === 'string') {
      foundation = theater.foundation;
    }

    const payload = {
      ...theater,
      foundation
    };

    console.log('📦 Payload enviado para o backend:', payload);

    return theater.id
      ? this.http.put(`${this.API_URL}/${theater.id}`, payload)
      : this.http.post(this.API_URL, payload);
  }


  remove(theater: Theater) {
    return this.http.delete<Theater>(`${this.API_URL}/${theater.id}`);
  }

}