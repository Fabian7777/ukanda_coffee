import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalAccountPageRoutingModule } from './personal-account-routing.module';

import { PersonalAccountPage } from './personal-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalAccountPageRoutingModule
  ],
  declarations: [PersonalAccountPage]
})
export class PersonalAccountPageModule {}
