import { Component, OnInit } from '@angular/core';
import { Director } from './models/director.type';
import { DirectorService } from './services/director.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-director',
  templateUrl: './director.page.html',
  styleUrls: ['./director.page.scss'],
  standalone: false
})
export class DirectorPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  directorList: Director[] = []

  constructor(private directorService: DirectorService, private alertController: AlertController, private toastController: ToastController,) { }

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
    this.directorService.getList().subscribe({
      next: (response) => {
        this.directorList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de diretores');
        console.error(error);
      }
    });
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
            this.directorService.remove(director).subscribe({
              next: (response) => {
                this.directorList = this.directorList.filter(g => g.id !== response.id);
                this.toastController.create({
                  message: `Diretor ${director.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir o diretor ' + director.name);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

  getAge(birth_date: string | Date): number {
    const birth = new Date(birth_date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

}
