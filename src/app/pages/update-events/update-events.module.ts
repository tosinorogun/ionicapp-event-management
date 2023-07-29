import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEventsPageRoutingModule } from './update-events-routing.module';

import { UpdateEventsPage } from './update-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEventsPageRoutingModule
  ],
  declarations: [UpdateEventsPage]
})
export class UpdateEventsPageModule {}
