import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.scss'],
  standalone: false,
})
export class TheaterFormComponent implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask
  maskitoElement = maskitoElement;

  theaterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    image: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    foundation: new FormControl(''),
    capacity: new FormControl(''),
    website: new FormControl('')
  });

  constructor() { }

  ngOnInit() { }

}