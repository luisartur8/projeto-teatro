import { Component, OnInit } from '@angular/core';
import { dateMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.scss'],
  standalone: false,
})
export class TheaterFormComponent  implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask
  maskitoElement = maskitoElement;

  constructor() { }

  ngOnInit() {}

}