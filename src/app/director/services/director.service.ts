import { Injectable } from "@angular/core";
import { Director } from "../models/director.type";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private readonly API_URL = 'http://localhost:3000/director';

  constructor(private http: HttpClient) { }

  getById(directorId: string) {
    return this.http.get<Director>(`${this.API_URL}/${directorId}`);
  }

  getList() {
    return this.http.get<Director[]>(this.API_URL);
  }

  private add(director: Director) {
    return this.http.post<Director>(this.API_URL, director);
  }

  private update(director: Director) {
    return this.http.put<Director>(`${this.API_URL}/${director.id}`, director);
  }

  save(director: Director) {
    let birth_date: string | null = null;

    if (director.birth_date instanceof Date) {
      birth_date = director.birth_date.toISOString().split('T')[0];
    } else if (typeof director.birth_date === 'string' && director.birth_date.includes('/')) {
      const [day, month, year] = director.birth_date.split('/');
      if (day && month && year) {
        birth_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    } else if (typeof director.birth_date === 'string') {
      birth_date = director.birth_date;
    }

    const payload = {
      ...director,
      birth_date
    };

    console.log('📦 Payload enviado para o backend:', payload);

    return director.id
      ? this.http.put(`${this.API_URL}/${director.id}`, payload)
      : this.http.post(this.API_URL, payload);
  }
  remove(director: Director) {
    return this.http.delete<Director>(`${this.API_URL}/${director.id}`);
  }

}