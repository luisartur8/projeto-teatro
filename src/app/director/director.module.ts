import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectorPageRoutingModule } from './director-routing.module';

import { DirectorPage } from './director.page';
import { DirectorFormComponent } from './director-form/director-form.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectorPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DirectorPage, DirectorFormComponent]
})
export class DirectorPageModule { }
