import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Teatros', url: '/theater', icon: 'extension-puzzle' },
    { title: 'Peças', url: '/play', icon: 'musical-notes' },
    { title: 'Atores', url: '/actor', icon: 'person' },
    { title: 'Configuração', url: '/configuration', icon: 'settings' },
  ];
  constructor() {}
}
