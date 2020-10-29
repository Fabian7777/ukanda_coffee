import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationErrorPageRoutingModule } from './location-error-routing.module';

import { LocationErrorPage } from './location-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationErrorPageRoutingModule
  ],
  declarations: [LocationErrorPage]
})
export class LocationErrorPageModule {}
