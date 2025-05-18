import { Injectable } from "@angular/core";
import { Actor } from "../models/actor.type";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorList: Actor[] = [
    {
      id: 1,
      name: "Rogerio Souza",
      image: 'https://blog.portalpos.com.br/wp-content/uploads/2023/07/pessoa-autentica.jpg',
      phone: '(48) 98422-2209',
      email: 'rogeriosouza@gmail.com',
      birthDate: new Date(1992, 4, 23),
      gender: 'M',
      biography: 'Nascido em criciuma'
    },
    {
      id: 2,
      name: "Marcio Silva",
      image: 'https://wendellcarvalho.com.br/wp-content/uploads/2023/07/Saiba-o-que-e-uma-pessoa-temperamental-e-como-esse-comportamento-pode-afetar-diferentes-areas-da-vida.jpg',
      phone: '(48) 98324-9868',
      email: 'marcio@gmail.com',
      birthDate: new Date(2002, 6, 20),
      gender: 'M',
      biography: 'Experiencia em atuação'
    },
    {
      id: 3,
      name: "Guilherme Santos",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjwvjndxQFsrZ_s7AhJV6I1RXnA2g5hy9mg&s',
      phone: '(48) 98765-4321',
      email: 'gui@gmail.com',
      birthDate: new Date(1989, 12, 2),
      gender: 'M',
      biography: 'Cursou faculdade em XYZ'
    },
    {
      id: 4,
      name: "Arildo Silva",
      image: 'https://media.istockphoto.com/id/1550540247/pt/foto/decision-thinking-and-asian-man-in-studio-with-glasses-questions-and-brainstorming-on-grey.jpg?s=612x612&w=0&k=20&c=AmKcK39-F9WazxAjEYv-WkbP6mUGHS4hNXs8XzUuqdU=',
      phone: '(48) 98234-5738',
      email: 'arildo@gmail.com',
      birthDate: new Date(1979, 12, 2),
      gender: 'M',
      biography: 'Professor de teatro'
    },
    {
      id: 5,
      name: "Joana Santos",
      image: 'https://img.freepik.com/fotos-gratis/jovem-femea-fazendo-gesto-de-quadro-em-camisa-e-olhando-confiante-vista-frontal_176474-53769.jpg?semt=ais_hybrid&w=740',
      phone: '(48) 99387-3245',
      email: 'joana@gmail.com',
      birthDate: new Date(1980, 12, 2),
      gender: 'F',
      biography: 'Filosofia UFSC'
    }
  ]

  constructor() { }

  getById(actorId: number) {
    return this.actorList.find(g => g.id === actorId);
  }

  getList() {
    return [...this.actorList];
  }

  private add(actor: Actor) {
    this.actorList = [...this.actorList, {
      ...actor,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    const maxId = this.actorList.reduce((id, actor) => {
      if (!!actor.id && actor?.id > id) {
        id = actor.id;
      }
      return id;
    }, 0);
    return maxId + 1;
  }

  private update(updatedActor: Actor) {
    this.actorList = this.actorList.map(g => {
      return (g.id === updatedActor.id) ? updatedActor : g;
    });
  }

  save(actor: Actor) {
    actor.id ? this.update(actor) : this.add(actor);
  }

  remove(actor: Actor) {
    this.actorList = this.actorList.filter(g => g.id !== actor.id);
  }

}