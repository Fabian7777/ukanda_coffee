import { AccountsComponent } from './accounts/accounts.component';
import { HeaderComponent } from './header/header.component';
import { ShareComponent } from './share/share.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
      ],
  declarations: [ShareComponent,HeaderComponent,AccountsComponent],
  exports:[ShareComponent, HeaderComponent, AccountsComponent]
})
export class ComponentsModule {}