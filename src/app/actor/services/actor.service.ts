import { Injectable } from "@angular/core";
import { Actor } from "../models/actor.type";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorList: Actor[] = [
    {
      name: "Rogerio",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gmv4VKSDNsinlRo0hh1CPLhGZlw92tZpjQ&s',
      phone: '(48) 98888-8888',
      email: 'fulano@gmail.com',
      birthDate: new Date(2000, 4, 23),
      gender: 'M',
      biography: 'Joga muito'
    },
    {
      name: "Maria",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gmv4VKSDNsinlRo0hh1CPLhGZlw92tZpjQ&s',
      phone: '(48) 91111-1111',
      email: 'fulana@gmail.com',
      birthDate: new Date(2002, 6, 20),
      gender: 'F',
      biography: 'Sabe muito'
    },
    {
      name: "Guilherme",
      image: 'https://m.media-amazon.com/images/I/61M3rDwh4qL._h1_.png',
      phone: '(21) 98765-4321',
      email: 'gui@gmail.com',
      birthDate: new Date(2005, 12, 2),
      gender: 'F',
      biography: 'Nota 5'
    }
  ]

  constructor() { }

  getList() {
    return [...this.actorList];
  }

  add(game: Actor) {
    this.actorList = [...this.actorList, game];
  }

}