import { Component, OnInit } from '@angular/core';
import { Actor } from './models/actor.type';
import { ActorService } from './services/actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.page.html',
  styleUrls: ['./actor.page.scss'],
  standalone: false
})
export class ActorPage implements OnInit {

  actorList: Actor[] = []

  constructor(private actorService: ActorService) {
    this.actorList = actorService.actorList
  }

  ngOnInit() {
  }

}
