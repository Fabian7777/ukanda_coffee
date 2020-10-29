import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationErrorPage } from './location-error.page';

const routes: Routes = [
  {
    path: '',
    component: LocationErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationErrorPageRoutingModule {}
