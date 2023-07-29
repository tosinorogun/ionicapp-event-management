import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateEventsPage } from './update-events.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateEventsPageRoutingModule {}
