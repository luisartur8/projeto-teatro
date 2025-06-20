import { Injectable } from "@angular/core";
import { Actor } from "../models/actor.type";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { ApplicationDateValidators } from "src/app/core/validators/date.validator";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly API_URL = 'http://localhost:3000/actor';

  constructor(private http: HttpClient) { }

  getById(actorId: string) {
    return this.http.get<Actor>(`${this.API_URL}/${actorId}`).pipe(
      map(actor => ({
        ...actor,
        birth_date: actor.birth_date
      }))
    );
  }

  getList() {
    return this.http.get<Actor[]>(this.API_URL).pipe(
      map(actors => actors.map(actor => ({
        ...actor,
        birth_date: actor.birth_date
      })))
    );
  }

  private add(actor: Actor) {
    return this.http.post<Actor>(this.API_URL, actor);
  }

  private update(actor: Actor) {
    return this.http.put<Actor>(`${this.API_URL}/${actor.id}`, actor);
  }

  save(actor: Actor) {
    let birth_date: string | null = null;

    if (actor.birth_date instanceof Date) {
      birth_date = actor.birth_date.toISOString().split('T')[0];
    } else if (typeof actor.birth_date === 'string' && actor.birth_date.includes('/')) {
      const [day, month, year] = actor.birth_date.split('/');
      if (day && month && year) {
        birth_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    } else if (typeof actor.birth_date === 'string') {
      birth_date = actor.birth_date;
    }

    const payload = {
      ...actor,
      birth_date
    };

    console.log('📦 Payload enviado para o backend:', payload);

    return actor.id
      ? this.http.put(`${this.API_URL}/${actor.id}`, payload)
      : this.http.post(this.API_URL, payload);
  }



  remove(actor: Actor) {
    return this.http.delete<Actor>(`${this.API_URL}/${actor.id}`);
  }

}