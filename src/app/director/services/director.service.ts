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
    return director.id ? this.update(director) : this.add(director);
  }

  remove(director: Director) {
    return this.http.delete<Director>(`${this.API_URL}/${director.id}`);
  }

}