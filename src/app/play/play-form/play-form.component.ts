import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationUrlValidators } from 'src/app/core/validators/url.validator';
import { PlayService } from '../services/play.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DirectorService } from 'src/app/director/services/director.service';
import { TheaterService } from 'src/app/theater/services/theater.service';
import { ActorService } from 'src/app/actor/services/actor.service';

@Component({
  selector: 'app-play-form',
  templateUrl: './play-form.component.html',
  styleUrls: ['./play-form.component.scss'],
  standalone: false,
})
export class PlayFormComponent implements OnInit {

  maskitoElement = maskitoElement;

  PlayForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    address: new FormControl(''),
    image: new FormControl('', [
      ApplicationUrlValidators.urlValidator
    ]),

    gender: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(255)]),


    directorId: new FormControl('', [Validators.required]),
    theaterId: new FormControl('', [Validators.required]),
    actorId: new FormControl([])
  });
  playId!: number;

  directorList: any[] = [];
  theaterList: any[] = [];
  actorList: any[] = [];
  constructor(
    private playService: PlayService,
    private directorService: DirectorService,
    private theaterService: TheaterService,
    private actorService: ActorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
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

  ngOnInit() {
    this.directorService.getList().subscribe((list) => this.directorList = list);
    this.theaterService.getList().subscribe((list) => this.theaterList = list);
    this.actorService.getList().subscribe((list) => this.actorList = list);
  }

  hasError(field: string, error: string) {
    const formControl = this.PlayForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.PlayForm;

    if (!value.image || value.image.trim() === '') {
      value.image = 'https://imgs.search.brave.com/vvPQQBvMiB8sI69j6zQ6Eow2teMG6HAKXXkMysEptCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWEy/LmRpc2NvdXJzZS1j/ZG4uY29tL2ZsZXgw/MjAvdXNlcl9hdmF0/YXIvY29tbXVuaXR5/LmdsaWRlYXBwcy5j/b20vbmF0aGFuYWVs/Yi80OC80MzA3OV8y/LnBuZw';
    }

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
        const backendMessage = error?.error?.message || error.message || 'Erro desconhecido';
        alert(`Erro ao salvar o play ${value.name}!\n\nDetalhes: ${JSON.stringify(backendMessage)}`);
        console.error('Erro detalhado:', error);
      }
    });
  }
}