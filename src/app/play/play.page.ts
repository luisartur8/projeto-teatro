import { Component, OnInit } from '@angular/core';
import { Play } from './models/play.type';
import { PlayService } from './services/play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false
})
export class PlayPage implements OnInit {

  playList: Play[] = []

  constructor(private playService: PlayService) {
    this.playList = playService.playList
  }

  ngOnInit() {
  }

}
