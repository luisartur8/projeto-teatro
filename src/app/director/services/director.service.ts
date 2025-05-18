import { Injectable } from "@angular/core";
import { Director } from "../models/director.type";

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private directorList: Director[] = [
    {
      id: 1,
      name: "Peter Brook",
      specialty: "Teatro Experimental, Direção Dramática",
      experience: "Mais de 70 anos no teatro mundial",
      image: 'https://imgs.search.brave.com/yrkF_A8yW-D6NcdhB2fLg6PGKhwWWc5rEkWyEny5csU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYW5k/YXZpZHByaXplLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvbm9t/aW5hdGlvbnMtbWFu/YWdlci9kNWFkNTVj/ZjVmOGE2NjczZDUw/NTJlOWM4MzVmN2Rh/MTYzOWE2MmE3Lmpw/Zw',
      phone: '(48) 98422-2209',
      email: 'pbrook@example.com',
      birthDate: new Date(1925, 3, 21),
      gender: 'M',
      biography: 'Peter Brook é um dos mais influentes diretores de teatro do século XX, conhecido por suas produções inovadoras e por redefinir o espaço teatral.'
    },
    {
      id: 2,
      name: "Julie Taymor",
      specialty: "Teatro Musical, Direção Visual",
      experience: "Mais de 40 anos atuando como diretora e designer de teatro",
      image: 'https://imgs.search.brave.com/48vKstWAGBTZtapSDcUKQqk8C2-hoKvHQ8dp1o_34c4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJvYWR3YXl3b3Js/ZC5jb20vZXpvaW1n/Zm10L2Nsb3VkaW1h/Z2VzLmJyb2Fkd2F5/d29ybGQuY29tL2hl/YWRzaG90cy83Nzg0/c20uanBnP2V6aW1n/Zm10PW5nOndlYnAv/bmdjYjEyMi9yczpk/ZXZpY2UvcnNjYjEy/My0x',
      phone: '(48) 98324-9868',
      email: 'jtaymor@example.com',
      birthDate: new Date(1952, 12, 15),
      gender: 'F',
      biography: 'Julie Taymor é reconhecida por sua direção inovadora em musicais como O Rei Leão da Broadway, combinando teatro, máscara e tecnologia.'
    },
    {
      id: 3,
      name: "Ariane Mnouchkine",
      specialty: "Teatro Político, Direção Comunitária",
      experience: "Mais de 50 anos de carreira em teatro contemporâneo",
      image: 'https://imgs.search.brave.com/EgxwtaQobjE-_IWN8n2MIREDhftaGXVg5McEquSyA7A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmFkaW9mcmFuY2Uu/ZnIvczMvY3J1aXNl/ci1wcm9kdWN0aW9u/LzIwMjEvMDEvN2Y4/ZWRjMDctMjE2NC00/OGJmLTk1ZjItODAw/ODA2NTE0ZWQ4LzI1/MHgyNTBfZ2V0dHlp/bWFnZXMtNjY1MDU4/NTQyLmpwZw',
      phone: '(48) 98765-4321',
      email: 'amnouchkine@example.com',
      birthDate: new Date(1939, 3, 3),
      gender: 'F',
      biography: 'Fundadora do Théâtre du Soleil, Ariane é conhecida por sua abordagem colaborativa e política no teatro.'
    },   
  ]

  constructor() { }

  getById(directorId: number) {
    return this.directorList.find(g => g.id === directorId);
  }

  getList() {
    return [...this.directorList];
  }

  private add(director: Director) {
    this.directorList = [...this.directorList, {
      ...director,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    const maxId = this.directorList.reduce((id, director) => {
      if (!!director.id && director?.id > id) {
        id = director.id;
      }
      return id;
    }, 0);
    return maxId + 1;
  }

  private update(updatedDirector: Director) {
    this.directorList = this.directorList.map(g => {
      return (g.id === updatedDirector.id) ? updatedDirector : g;
    });
  }

  save(director: Director) {
    director.id ? this.update(director) : this.add(director);
  }

  remove(director: Director) {
    this.directorList = this.directorList.filter(g => g.id !== director.id);
  }

}