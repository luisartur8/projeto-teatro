import { Component, OnInit } from '@angular/core';
import { Actor } from './models/actor.type';
import { ActorService } from './services/actor.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.page.html',
  styleUrls: ['./actor.page.scss'],
  standalone: false
})
export class ActorPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  actorList: Actor[] = []

  constructor(private actorService: ActorService, private alertController: AlertController, private toastController: ToastController,) { }

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
        this.actorList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de jogos');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(actor: Actor) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do ator ${actor.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.actorService.remove(actor).subscribe({
              next: (response) => {
                this.actorList = this.actorList.filter(g => g.id !== response.id);
                this.toastController.create({
                  message: `Ator ${actor.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir o ator ' + actor.name);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
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

}
