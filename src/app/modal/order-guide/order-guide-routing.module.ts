import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderGuidePage } from './order-guide.page';

const routes: Routes = [
  {
    path: '',
    component: OrderGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderGuidePageRoutingModule {}
