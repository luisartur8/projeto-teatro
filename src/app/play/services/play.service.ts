import { Injectable } from '@angular/core';
import { Play } from '../models/play.type';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  playList: Play[] = [
    {
      name: 'O Auto da Compadecida',
      synopsis: "Uma comédia nordestina que narra as aventuras de João Grilo e Chicó, dois amigos espertalhões que enfrentam desafios e trapalhadas em uma cidade do interior, misturando humor, crítica social e elementos do folclore brasileiro.",      
      address: 'Teatro Municipal de São Paulo, Praça Ramos de Azevedo, s/n, Centro, São Paulo, SP, Brasil',
      capacity: 1500,
      gender: 'Comédia',
    },
    
  ]

  constructor() { }
}