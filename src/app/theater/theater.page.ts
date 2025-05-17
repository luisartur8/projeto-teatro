import { Component, OnInit } from '@angular/core';
import { Theater } from './models/theater.type';
import { TheaterService } from './services/theater.service';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.page.html',
  styleUrls: ['./theater.page.scss'],
  standalone: false
})
export class TheaterPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  theaterList: Theater[] = []

  constructor(private theaterService: TheaterService) { }

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

  ngOnInit() {
  }

}
