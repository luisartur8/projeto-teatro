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
      ApplicationUrlValidators.urlValidator
    ]),
    phone: new FormControl('', [
      Validators.required,
      ApplicationPhoneValidators.phoneValidator
    ]),
    birth_date: new FormControl('', [
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
            if (actor.birth_date instanceof Date) {
              actor.birth_date = formatDateMask(actor.birth_date);
            }
            if (typeof actor.birth_date === 'string') {
              const parsedDate = parseDateMask(actor.birth_date, 'yyyy/mm/dd');
              actor.birth_date = parsedDate ? formatDateMask(parsedDate) : '';
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

    if (!value.image || value.image.trim() === '') {
      value.image = 'https://imgs.search.brave.com/vvPQQBvMiB8sI69j6zQ6Eow2teMG6HAKXXkMysEptCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWEy/LmRpc2NvdXJzZS1j/ZG4uY29tL2ZsZXgw/MjAvdXNlcl9hdmF0/YXIvY29tbXVuaXR5/LmdsaWRlYXBwcy5j/b20vbmF0aGFuYWVs/Yi80OC80MzA3OV8y/LnBuZw';
    }
    if (value.birth_date) {
      const parsedDate = parseDateMask(value.birth_date);
      if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        value.birth_date = parsedDate.toISOString();
      } else {
        value.birth_date = null;
      }
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
        const backendMessage = error?.error?.message || error.message || 'Erro desconhecido';
        alert(`Erro ao salvar o ator ${value.name}!\n\nDetalhes: ${JSON.stringify(backendMessage)}`);
        console.error('Erro detalhado:', error);
      }
    });
  }
}