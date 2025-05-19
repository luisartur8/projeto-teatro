import { Injectable } from "@angular/core";
import { Actor } from "../models/actor.type";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly API_URL = 'http://localhost:3000/actor';

  constructor(private http: HttpClient) { }

  getById(actorId: string) {
    return this.http.get<Actor>(`${this.API_URL}/${actorId}`);
  }

  getList() {
    return this.http.get<Actor[]>(this.API_URL);
  }

  private add(actor: Actor) {
    return this.http.post<Actor>(this.API_URL, actor);
  }

  private update(actor: Actor) {
    return this.http.put<Actor>(`${this.API_URL}/${actor.id}`, actor);
  }

  save(actor: Actor) {
    return actor.id ? this.update(actor) : this.add(actor);
  }

  remove(actor: Actor) {
    return this.http.delete<Actor>(`${this.API_URL}/${actor.id}`);
  }

}