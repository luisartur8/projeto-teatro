import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActorPageRoutingModule } from './actor-routing.module';

import { ActorPage } from './actor.page';
import { ActorFormComponent } from './actor-form/actor-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActorPageRoutingModule
  ],
  declarations: [ActorPage, ActorFormComponent]
})
export class ActorPageModule { }
