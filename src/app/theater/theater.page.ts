import { Component, OnInit } from '@angular/core';
import { Theater } from './models/theater.type';
import { TheaterService } from './services/theater.service';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.page.html',
  styleUrls: ['./theater.page.scss'],
  standalone: false
})
export class TheaterPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  theaterList: Theater[] = []

  constructor(private theaterService: TheaterService, private alertController: AlertController) { }

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
    this.theaterList = this.theaterService.getList();
  }

  ngOnInit() { }

  remove(theater: Theater) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do teatro ${theater.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.theaterService.remove(theater);
            this.theaterList = this.theaterService.getList();
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

}
