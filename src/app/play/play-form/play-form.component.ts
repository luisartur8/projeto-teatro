import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-play-form',
  templateUrl: './play-form.component.html',
  styleUrls: ['./play-form.component.scss'],
  standalone: false,
})
export class PlayFormComponent implements OnInit {
  maskitoElement = maskitoElement;

  PlayForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),   
    adress: new FormControl(''),
    capacity: new FormControl(''),
    gender: new FormControl('' ),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)])
  });

  constructor() { }

  ngOnInit() { }

}