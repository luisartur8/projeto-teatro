import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'game-controller' },
    { title: 'Teatros', url: '/theater', icon: 'game-controller' },
    { title: 'Atores', url: '/actor', icon: 'game-controller' },
    { title: 'Configuração', url: '/configuration', icon: 'game-controller' },
  ];
  constructor() {}
}
