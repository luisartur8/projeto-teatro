import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { capacityMask, dateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { TheaterService } from '../services/theater.service';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.scss'],
  standalone: false,
})
export class TheaterFormComponent implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask;
  capacityMask = capacityMask;
  maskitoElement = maskitoElement;

  theaterForm: FormGroup = new FormGroup({
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
    foundation: new FormControl('', [
      Validators.required,
      ApplicationDateValidators.dateValidator
    ]),
    email: new FormControl('', [
      Validators.required,
      ApplicationEmailValidators.emailValidator
    ]),
    address: new FormControl(''),
    capacity: new FormControl(''),
    website: new FormControl('', [
      Validators.required,
      ApplicationUrlValidators.urlValidator
    ])
  });

  constructor(private theaterService: TheaterService) { }

  ngOnInit() { }

  hasError(field: string, error: string) {
    const formControl = this.theaterForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.theaterForm;
    value.foundation = parseDateMask(value.foundation)
    this.theaterService.add(value);
  }
}