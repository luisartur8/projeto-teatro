import { Component, OnInit } from '@angular/core';
import { Play } from './models/play.type';
import { PlayService } from './services/play.service';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false
})
export class PlayPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave  {

  playList: Play[] = []

  constructor(private playService: PlayService, private alertController: AlertController) {
    this.playList = playService.playList
  }
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
    this.playList = this.playService.getList();
  }

  ngOnInit() {
  }

  remove(play: Play) {
      this.alertController.create({
        header: 'Exclusão',
        message: `Confirma a exclusão da Peça ${play.name}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.playService.remove(play);
              this.playList = this.playService.getList();
            }
          },
          'Não'
        ]
      }).then(alert => alert.present());
    }
}
