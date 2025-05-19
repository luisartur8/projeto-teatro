import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { capacityMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { PlayService } from '../services/play.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    gender: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(255)])
  });
  playId!: number;

  constructor(private playService: PlayService, private router: Router, private activatedRoute: ActivatedRoute, private toastController: ToastController) {
    const playId = this.activatedRoute.snapshot.params['playId'];
    if (playId) {
      this.playService.getById(playId).subscribe({
        next: (play) => {
          if (play) {
            this.playId = playId;
            this.PlayForm.patchValue(play);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o peça com id ' + playId)
          console.error(error);
        }
      });
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
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Peça salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/play']);
      },
      error: (error) => {
        alert('Erro ao salvar a peça ' + value.name + '!');
        console.error(error);
      }
    });
  }
}