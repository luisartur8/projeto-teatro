import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { DirectorService } from '../services/director.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(private directorService: DirectorService, private router: Router, private activatedRoute: ActivatedRoute, private toastController: ToastController) {
    const directorId = this.activatedRoute.snapshot.params['directorId'];
    if (directorId) {
      this.directorService.getById(directorId).subscribe({
        next: (director) => {
          if (director) {
            this.directorId = directorId;
            if (director.birthDate instanceof Date) {
              director.birthDate = formatDateMask(director.birthDate);
            }
            if (typeof director.birthDate === 'string') {
              const parsedDate = parseDateMask(director.birthDate, 'yyyy/mm/dd');
              director.birthDate = parsedDate ? formatDateMask(parsedDate) : '';
            }
            this.directorForm.patchValue(director);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o diretor com id ' + directorId)
          console.error(error);
        }
      });
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
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Diretor salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/director']);
      },
      error: (error) => {
        alert('Erro ao salvar o diretor ' + value.name + '!');
        console.error(error);
      }
    });
  }
}