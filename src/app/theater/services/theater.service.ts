import { Injectable } from '@angular/core';
import { Theater } from '../models/theater.type';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  private theaterList: Theater[] = [
    {
      id: 1,
      name: 'Casa rosa',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gmv4VKSDNsinlRo0hh1CPLhGZlw92tZpjQ&s',
      phone: '(48) 98888-8888',
      email: 'josefine@gmail.com',
      foundation: new Date(1985, 8, 13),
      address: 'rua do passarinho',
      capacity: 24,
      website: 'https://www.google.com',
    },
    {
      id: 2,
      name: 'Teatro amazonas',
      image: 'https://m.media-amazon.com/images/I/61M3rDwh4qL._h1_.png',
      phone: '(21) 97777-7777',
      email: 'amazonas@gmail.com',
      foundation: new Date(2000, 12, 12),
      address: 'rua central',
      capacity: 300,
      website: 'https://www.amazon.com',
    },
    {
      id: 3,
      name: 'Teatro amazonas',
      image: null,
      phone: '(21) 97777-7777',
      email: 'amazonas@gmail.com',
      foundation: new Date(2000, 12, 12),
      address: 'rua central',
      capacity: 300,
      website: 'https://www.amazon.com',
    }
  ]

  constructor() { }

  getById(theaterId: number) {
    return this.theaterList.find(g => g.id === theaterId);
  }

  getList() {
    return [...this.theaterList];
  }

  private add(theater: Theater) {
    this.theaterList = [...this.theaterList, {
      ...theater,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    const maxId = this.theaterList.reduce((id, theater) => {
      if (!!theater.id && theater?.id > id) {
        id = theater.id;
      }
      return id;
    }, 0);
    return maxId + 1;
  }

  private update(updatedTheater: Theater) {
    this.theaterList = this.theaterList.map(g => {
      return (g.id === updatedTheater.id) ? updatedTheater : g;
    });
  }

  save(theater: Theater) {
    theater.id ? this.update(theater) : this.add(theater);
  }

  remove(theater: Theater) {
    this.theaterList = this.theaterList.filter(g => g.id !== theater.id);
  }

}