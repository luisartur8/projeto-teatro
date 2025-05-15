import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TheaterPageRoutingModule } from './theater-routing.module';

import { TheaterPage } from './theater.page';
import { TheaterFormComponent } from './theater-form/theater-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TheaterPageRoutingModule
  ],
  declarations: [TheaterPage, TheaterFormComponent]
})
export class TheaterPageModule {}
