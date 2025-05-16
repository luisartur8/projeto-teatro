import { Component, OnInit } from '@angular/core';
import { dateMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss'],
  standalone: false,
})
export class ActorFormComponent  implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask;
  maskitoElement = maskitoElement;

  constructor() { }

  ngOnInit() {}

}