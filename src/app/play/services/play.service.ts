import { Injectable } from '@angular/core';
import { Play } from '../models/play.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private readonly API_URL = 'http://localhost:3000/play';

  constructor(private http: HttpClient) { }

  getById(playId: string) {
    return this.http.get<Play>(`${this.API_URL}/${playId}`);
  }

  getList() {
    return this.http.get<Play[]>(this.API_URL);
  }

  private add(play: Play) {
    return this.http.post<Play>(this.API_URL, play);
  }

  private update(play: Play) {
    return this.http.put<Play>(`${this.API_URL}/${play.id}`, play);
  }

  save(play: Play) {
    return play.id ? this.update(play) : this.add(play);
  }

  remove(play: Play) {
    return this.http.delete<Play>(`${this.API_URL}/${play.id}`);
  }

}