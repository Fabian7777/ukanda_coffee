import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAccountPage } from './business-account.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessAccountPageRoutingModule {}
