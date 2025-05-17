import { Component, OnInit } from '@angular/core';
import { Actor } from './models/actor.type';
import { ActorService } from './services/actor.service';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.page.html',
  styleUrls: ['./actor.page.scss'],
  standalone: false
})
export class ActorPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  actorList: Actor[] = []

  constructor(private actorService: ActorService, private alertController: AlertController) { }

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
    this.actorList = this.actorService.getList();
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
            this.actorService.remove(actor);
            this.actorList = this.actorService.getList();
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

}
