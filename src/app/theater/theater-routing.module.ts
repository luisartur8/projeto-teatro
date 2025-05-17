import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TheaterPage } from './theater.page';
import { TheaterFormComponent } from './theater-form/theater-form.component';

const routes: Routes = [
  {
    path: '',
    component: TheaterPage
  },
  {
    path: 'new',
    component: TheaterFormComponent
  },
  {
    path: 'edit/:theaterId',
    component: TheaterFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheaterPageRoutingModule { }
