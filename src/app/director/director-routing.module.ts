import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorPage } from './director.page';
import { DirectorFormComponent } from './director-form/director-form.component';

const routes: Routes = [
  {
    path: '',
    component: DirectorPage
  },
  {
    path: 'new',
    component: DirectorFormComponent
  },
  {
    path: 'edit/:directorId',
    component: DirectorFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorPageRoutingModule { }
