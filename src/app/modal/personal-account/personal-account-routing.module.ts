import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAccountPage } from './personal-account.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalAccountPageRoutingModule {}
