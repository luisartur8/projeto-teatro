import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { DirectorService } from '../services/director.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-director-form',
  templateUrl: './director-form.component.html',
  styleUrls: ['./director-form.component.scss'],
  standalone: false,
})
export class DirectorFormComponent implements OnInit {

  dateMask = dateMask;
  phoneMask = phoneMask;
  maskitoElement = maskitoElement;

  directorForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]),
    experience: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]),
    specialty: new FormControl('', [
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
  directorId!: number;

  constructor(private directorService: DirectorService, private router: Router, private activatedRoute: ActivatedRoute) {
    const directorId = parseInt(this.activatedRoute.snapshot.params['directorId']);
    if (directorId) {
      const director = this.directorService.getById(directorId);
      if (director) {
        this.directorId = directorId;
        if (director.birthDate instanceof Date) {
          director.birthDate = formatDateMask(director.birthDate);
        }
        this.directorForm.patchValue(director);
      }
    }
  }

  ngOnInit() { }

  hasError(field: string, error: string) {
    const formControl = this.directorForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.directorForm;
    if (value.birthDate) {
      value.birthDate = parseDateMask(value.birthDate)
    }
    this.directorService.save({
      ...value,
      id: this.directorId
    });
    this.router.navigate(['/director']);
  }
}