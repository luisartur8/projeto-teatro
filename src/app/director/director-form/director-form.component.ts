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
  directorId!: number;

  constructor(private directorService: DirectorService, private router: Router, private activatedRoute: ActivatedRoute, private toastController: ToastController) {
    const directorId = this.activatedRoute.snapshot.params['directorId'];
    if (directorId) {
      this.directorService.getById(directorId).subscribe({
        next: (director) => {
          if (director) {
            this.directorId = directorId;
            if (director.birth_date instanceof Date) {
              director.birth_date = formatDateMask(director.birth_date);
            }
            if (typeof director.birth_date === 'string') {
              const parsedDate = parseDateMask(director.birth_date, 'yyyy/mm/dd');
              director.birth_date = parsedDate ? formatDateMask(parsedDate) : '';
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

    if (!value.image || value.image.trim() === '') {
      value.image = 'https://imgs.search.brave.com/vvPQQBvMiB8sI69j6zQ6Eow2teMG6HAKXXkMysEptCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWEy/LmRpc2NvdXJzZS1j/ZG4uY29tL2ZsZXgw/MjAvdXNlcl9hdmF0/YXIvY29tbXVuaXR5/LmdsaWRlYXBwcy5j/b20vbmF0aGFuYWVs/Yi80OC80MzA3OV8y/LnBuZw';
    }

    if (value.birth_date) {
      value.birth_date = parseDateMask(value.birth_date)
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
        const backendMessage = error?.error?.message || error.message || 'Erro desconhecido';
        alert(`Erro ao salvar o diretor ${value.name}!\n\nDetalhes: ${JSON.stringify(backendMessage)}`);
        console.error('Erro detalhado:', error);
      }
    });
  }
}