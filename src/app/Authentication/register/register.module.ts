import { ComponentsModule } from 'src/app/shared/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { IonicSelectableModule } from 'ionic-selectable';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ComponentsModule,
    IonicSelectableModule,
    NgxMaskIonicModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
