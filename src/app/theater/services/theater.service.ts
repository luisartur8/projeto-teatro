import { Injectable } from '@angular/core';
import { Theater } from '../models/theater.type';
import { HttpClient } from '@angular/common/http';

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

  private add(theater: Theater) {
    return this.http.post<Theater>(this.API_URL, theater);
  }

  private update(theater: Theater) {
    return this.http.put<Theater>(`${this.API_URL}/${theater.id}`, theater);
  }

  save(theater: Theater) {
    return theater.id ? this.update(theater) : this.add(theater);
  }

  remove(theater: Theater) {
    return this.http.delete<Theater>(`${this.API_URL}/${theater.id}`);
  }

}