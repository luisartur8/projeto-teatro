import { Component, OnInit } from '@angular/core';
import { Director } from './models/director.type';
import { DirectorService } from './services/director.service';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-director',
  templateUrl: './director.page.html',
  styleUrls: ['./director.page.scss'],
  standalone: false
})
export class DirectorPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  directorList: Director[] = []

  constructor(private directorService: DirectorService, private alertController: AlertController) { }

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
    this.directorList = this.directorService.getList();
  }

  ngOnInit() { }

  remove(director: Director) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do ator ${director.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.directorService.remove(director);
            this.directorList = this.directorService.getList();
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
