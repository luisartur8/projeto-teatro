import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { capacityMask, dateMask, formatDateMask, maskitoElement, parseDateMask, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationPhoneValidators } from 'src/app/core/validators/phone.validator';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { ApplicationDateValidators } from 'src/app/core/validators/date.validator';
import { TheaterService } from '../services/theater.service';
import { ApplicationEmailValidators } from 'src/app/core/validators/email.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
      ApplicationUrlValidators.urlValidator
    ])
  });
  theaterId!: string;

  constructor(private theaterService: TheaterService, private router: Router, private activatedRoute: ActivatedRoute, private toastController: ToastController) {
    const theaterId = this.activatedRoute.snapshot.params['theaterId'];
    if (theaterId) {
      this.theaterService.getById(theaterId).subscribe({
        next: (theater) => {
          if (theater) {
            this.theaterId = theaterId;
            if (theater.foundation instanceof Date) {
              theater.foundation = formatDateMask(theater.foundation);
            }
            if (typeof theater.foundation === 'string') {
              const parsedDate = parseDateMask(theater.foundation, 'yyyy/mm/dd');
              theater.foundation = parsedDate ? formatDateMask(parsedDate) : '';
            }
            this.theaterForm.patchValue(theater);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o teatro com id ' + theaterId)
          console.error(error);
        }
      });
    }
  }

  ngOnInit() { }

  hasError(field: string, error: string) {
    const formControl = this.theaterForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.theaterForm;
    if (!value.image || value.image.trim() === '') {
      value.image = 'https://imgs.search.brave.com/vvPQQBvMiB8sI69j6zQ6Eow2teMG6HAKXXkMysEptCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWEy/LmRpc2NvdXJzZS1j/ZG4uY29tL2ZsZXgw/MjAvdXNlcl9hdmF0/YXIvY29tbXVuaXR5/LmdsaWRlYXBwcy5j/b20vbmF0aGFuYWVs/Yi80OC80MzA3OV8y/LnBuZw';
    }
    if (!value.website || value.website.trim() === '') {
      value.website = 'https://default.com';
    }
    if (value.foundation) {
      value.foundation = parseDateMask(value.foundation)
    }
    this.theaterService.save({
      ...value,
      id: this.theaterId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Teatro salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/theater']);
      },
      error: (error) => {
        const backendMessage = error?.error?.message || error.message || 'Erro desconhecido';
        alert(`Erro ao salvar o play ${value.name}!\n\nDetalhes: ${JSON.stringify(backendMessage)}`);
        console.error('Erro detalhado:', error);
      }
    });
  }
}