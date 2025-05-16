import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  actorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    image: new FormControl(''),
    phone: new FormControl(''),
    birthDate: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    biography: new FormControl('')
  });

  constructor() { }

  ngOnInit() {}

}