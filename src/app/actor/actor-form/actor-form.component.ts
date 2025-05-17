import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { ActorService } from '../services/actor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss'],
  standalone: false,
})
export class ActorFormComponent implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask;
  maskitoElement = maskitoElement;

  actorForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]),
    image: new FormControl('', [
      Validators.required,
      ApplicationUrlValidators.urlValidator
    ]),
    phone: new FormControl('', [
      Validators.required,
      ApplicationPhoneValidators.phoneValidator
    ]),
    birthDate: new FormControl('', [
      Validators.required,
      ApplicationDateValidators.dateValidator
    ]),
    email: new FormControl('', [
      Validators.required,
      ApplicationEmailValidators.emailValidator
    ]),
    gender: new FormControl(''),
    biography: new FormControl('')
  });

  constructor(private actorService: ActorService, private router: Router) { }

  ngOnInit() { }

  hasError(field: string, error: string) {
    const formControl = this.actorForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.actorForm;
    value.birthDate = parseDateMask(value.birthDate)
    this.actorService.add(value);
    this.router.navigate(['/actor']);
  }
}