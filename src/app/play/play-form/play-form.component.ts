import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { capacityMask, dateMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { PlayService } from '../services/play.service';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-play-form',
  templateUrl: './play-form.component.html',
  styleUrls: ['./play-form.component.scss'],
  standalone: false,
})
export class PlayFormComponent implements OnInit {
  capacityMask = capacityMask;
  maskitoElement = maskitoElement;

  PlayForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    address: new FormControl(''),
    image: new FormControl('', [
      Validators.required,
      ApplicationUrlValidators.urlValidator
    ]),
    capacity: new FormControl(''),
    gender: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)] ),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(255)])
  });
  playId!: number;
  
  constructor(private playService: PlayService, private router: Router, private activatedRoute: ActivatedRoute) {
    const playId = parseInt(this.activatedRoute.snapshot.params['playId']);
    if (playId) {
      const play = this.playService.getById(playId);
      if (play) {
        this.playId = playId;        
        this.PlayForm.patchValue(play);
      }
    }
  }

  ngOnInit() { }
  
  hasError(field: string, error: string) {
    const formControl = this.PlayForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.PlayForm;
    
    this.playService.save({
      ...value,
      id: this.playId
    });
    this.router.navigate(['/play']);
  }
}