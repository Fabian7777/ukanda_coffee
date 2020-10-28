import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessAccountPageRoutingModule } from './business-account-routing.module';

import { BusinessAccountPage } from './business-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessAccountPageRoutingModule
  ],
  declarations: [BusinessAccountPage]
})
export class BusinessAccountPageModule {}
