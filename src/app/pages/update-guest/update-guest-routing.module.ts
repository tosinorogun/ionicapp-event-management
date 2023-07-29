import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateGuestPage } from './update-guest.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateGuestPageRoutingModule {}
