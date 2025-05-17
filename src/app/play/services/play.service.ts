import { Injectable } from '@angular/core';
import { Play } from '../models/play.type';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  playList: Play[] = [
    {
      id: 1,
      name: 'O Auto da Compadecida',
      synopsis: "Uma comédia nordestina que narra as aventuras de João Grilo e Chicó, dois amigos espertalhões que enfrentam desafios e trapalhadas em uma cidade do interior, misturando humor, crítica social e elementos do folclore brasileiro.",      
      address: 'Teatro Municipal de São Paulo, Praça Ramos de Azevedo, s/n, Centro, São Paulo, SP, Brasil',
      capacity: 1500,
      gender: 'Comédia',
    },
    
  ]

  constructor() { }
  getById(playId: number) {
    return this.playList.find(g => g.id === playId);
  }

  getList() {
    return [...this.playList];
  }

  private add(play: Play) {
    this.playList = [...this.playList, {
      ...play,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    const maxId = this.playList.reduce((id, play) => {
      if (!!play.id && play?.id > id) {
        id = play.id;
      }
      return id;
    }, 0);
    return maxId + 1;
  }

  private update(updatedPlay: Play) {
    this.playList = this.playList.map(g => {
      return (g.id === updatedPlay.id) ? updatedPlay : g;
    });
  }

  save(play: Play) {
    play.id ? this.update(play) : this.add(play);
  }

  remove(play: Play) {
    this.playList = this.playList.filter(g => g.id !== play.id);
  }
}