import { Component, OnInit } from '@angular/core';
import { Actor } from '../actor/models/actor.type';
import { ActorService } from '../actor/services/actor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  actorList: Actor[] = []
  orderedActor: Actor[] = [];
  selectedOrder: 'asc' | 'desc' = 'asc';

  constructor(private actorService: ActorService) { }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.actorService.getList().subscribe({
      next: (response) => {
        console.log('response: ', response);

        this.actorList = response;
        this.orderBirthDate();
      },
      error: (error) => {
        alert('Erro ao carregar lista de atores');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  orderBirthDate() {
    this.orderedActor = [...this.actorList].sort((a, b) => {
      const dataA = new Date(a.birthDate).getTime();
      const dataB = new Date(b.birthDate).getTime();

      return this.selectedOrder === 'asc' ? dataA - dataB : dataB - dataA;
    });
  }

  onOrderChange() {
    this.orderBirthDate();
  }

  getAge(birthDate: string | Date): number {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  getActorInfo() {
    let homem = 0, mulher = 0
    const actors = this.actorList;

    actors.map(actor => {
      if (actor.gender === 'M') homem++;
      if (actor.gender === 'F') mulher++;
    })

    return {
      homem: {
        quantidade: homem,
        percentual: (homem / actors.length) * 100
      },
      mulher: {
        quantidade: mulher,
        percentual: (mulher / actors.length) * 100
      }
    }
  }

}
