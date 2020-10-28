import { ComponentsModule } from './../../shared/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountSelectionPageRoutingModule } from './account-selection-routing.module';
import { AccountSelectionPage } from './account-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSelectionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AccountSelectionPage]
})
export class AccountSelectionPageModule {}
