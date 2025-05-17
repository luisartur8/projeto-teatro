import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPage } from './play.page';
import { PlayFormComponent } from './play-form/play-form.component';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
  },
  {
    path: 'new',
    component: PlayFormComponent
  },
  {
    path: 'edit/:playId',
    component: PlayFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}
