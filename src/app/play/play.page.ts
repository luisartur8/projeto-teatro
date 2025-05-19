import { Component, OnInit } from '@angular/core';
import { Play } from './models/play.type';
import { PlayService } from './services/play.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false
})
export class PlayPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  playList: Play[] = []

  constructor(private playService: PlayService, private alertController: AlertController, private toastController: ToastController,) { }

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
    this.playService.getList().subscribe({
      next: (response) => {
        this.playList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de peças');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(play: Play) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da Peça ${play.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.playService.remove(play).subscribe({
              next: (response) => {
                this.playList = this.playList.filter(g => g.id !== response.id);
                this.toastController.create({
                  message: `Peça ${play.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir a peça ' + play.name);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }
}
