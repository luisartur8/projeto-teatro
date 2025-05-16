import { Component, OnInit } from '@angular/core';
import { Theater } from './models/theater.type';
import { TheaterService } from './services/theater.service';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.page.html',
  styleUrls: ['./theater.page.scss'],
  standalone: false
})
export class TheaterPage implements OnInit {

  theaterList: Theater[] = []

  constructor(private theaterService: TheaterService) {
    this.theaterList = theaterService.theaterList
  }

  ngOnInit() {
  }

}
