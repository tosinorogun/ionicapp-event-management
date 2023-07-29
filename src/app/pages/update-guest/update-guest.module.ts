import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateGuestPageRoutingModule } from './update-guest-routing.module';

import { UpdateGuestPage } from './update-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateGuestPageRoutingModule
  ],
  declarations: [UpdateGuestPage]
})
export class UpdateGuestPageModule {}
