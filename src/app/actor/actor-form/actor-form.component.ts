import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { ActorService } from '../services/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  actorId!: number;

  constructor(
    private actorService: ActorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    const actorId = this.activatedRoute.snapshot.params['actorId'];

    if (actorId) {
      this.actorService.getById(actorId).subscribe({
        next: (actor) => {
          if (actor) {
            this.actorId = actorId;
            if (actor.birthDate instanceof Date) {
              actor.birthDate = formatDateMask(actor.birthDate);
            }
            if (typeof actor.birthDate === 'string') {
              const parsedDate = parseDateMask(actor.birthDate, 'yyyy/mm/dd');
              actor.birthDate = parsedDate ? formatDateMask(parsedDate) : '';
            }
            this.actorForm.patchValue(actor);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o ator com id ' + actorId)
          console.error(error);
        }
      });
    }
  }

  ngOnInit() { }

  hasError(field: string, error: string) {
    const formControl = this.actorForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.actorForm;
    if (value.birthDate) {
      value.birthDate = parseDateMask(value.birthDate)
    }
    this.actorService.save({
      ...value,
      id: this.actorId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Ator salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/actor']);
      },
      error: (error) => {
        alert('Erro ao salvar o ator ' + value.name + '!');
        console.error(error);
      }
    });
  }
}