import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderGuidePageRoutingModule } from './order-guide-routing.module';

import { OrderGuidePage } from './order-guide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderGuidePageRoutingModule
  ],
  declarations: [OrderGuidePage]
})
export class OrderGuidePageModule {}
