import { Injectable } from '@angular/core';
import { Play } from '../models/play.type';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  playList: Play[] = [
    {
      id: 1,
      image: 'https://imgs.search.brave.com/_l6A5jw_xhoGUsTeb_t3p5R1kijvGsNkEQhq-yL9QTE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qll6RTRZemxt/TmpjdE5HRm1PQzAw/TnpnM0xXRmxPV1F0/TURVNFlUQTBNVEpo/T0RZM1hrRXlYa0Zx/Y0djQC5qcGc',
      name: 'O Auto da Compadecida',
      synopsis: "Uma comédia nordestina que narra as aventuras de João Grilo e Chicó, dois amigos espertalhões que enfrentam desafios e trapalhadas em uma cidade do interior, misturando humor, crítica social e elementos do folclore brasileiro.",      
      address: 'Teatro Municipal de São Paulo, Praça Ramos de Azevedo, s/n, Centro, São Paulo, SP, Brasil',
      capacity: 1500,
      gender: 'Comédia',
    },
    {
      id: 2,
      image: 'https://imgs.search.brave.com/a1cahcIEhBANVoIhRHYHJF3uD3GCGVvgAKsXZ-0bEoA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ici53/ZWIuaW1nMi5hY3N0/YS5uZXQvY18zMDBf/MzAwL3BpY3R1cmVz/LzE0LzA4LzE0LzEy/LzMwLzA4NjA3MS5q/cGc',
      name: 'Hamlet',
      synopsis: "A tragédia de Shakespeare sobre o príncipe da Dinamarca, que busca vingança pela morte do pai.",      
      address: 'Royal Shakespeare Theatre, Stratford-upon-Avon, UK',
      capacity: 1040,
      gender: 'Tragédia',
    },
    {
      id: 3,
      image: 'https://imgs.search.brave.com/tidIS2qrCqrWmVKvfuqzlxRWbWWV7p5aTSwD90xWSsQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lc2Ny/aXRvc2RldmFnbmVy/LndvcmRwcmVzcy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMTIvZXNwZXJh/bmRvLWdvZG90LTEu/anBn',
      name: 'Esperando Godot',
      synopsis: 'Obra-prima do teatro do absurdo de Samuel Beckett, com dois personagens à espera de alguém que nunca chega.',      
      address: 'Théâtre de l Odéon, Paris, França',
      capacity: 800,
      gender: 'Teatro do Absurdo',
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