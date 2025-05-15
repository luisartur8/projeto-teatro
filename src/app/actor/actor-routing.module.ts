import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActorPage } from './actor.page';
import { ActorFormComponent } from './actor-form/actor-form.component';

const routes: Routes = [
  {
    path: '',
    component: ActorPage
  },
  {
    path: 'new',
    component: ActorFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorPageRoutingModule {}
