import { NotifyService } from './../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-account-selection',
  templateUrl: './account-selection.page.html',
  styleUrls: ['./account-selection.page.scss'],
})
export class AccountSelectionPage implements OnInit {


  guides = [];
  isLoading: boolean = false;

  accounts={selected_type: 0}
 
  constructor(public modalController: ModalController, public notify: NotifyService, public authService: AuthService,private router: Router,private navCtrl: NavController) { }

  ngOnInit() {
    this.load_guide();
  }

  close_page(){
    //this.navCtrl.back();
    this.router.navigate(['/login']);
  }

  load_guide() {
    //start load
    this.isLoading = true;

    //Api connections
    this.authService.get_without_tokens('guide').then((data: any) => {

      let responsedata = data;
      console.log(responsedata);

      if (responsedata.code == "200") {

        this.guides = responsedata.msg;

      }

      //close load
      this.isLoading = false;

    }, (err) => {
      //display error
      console.log(err);

      //close load
      this.isLoading = false;

      this.notify.process_errors(err);

    });
  }

  choose_account() {
    if (this.accounts.selected_type === 0 ) {
      this.notify.toast_with_icon_color('close-circle-sharp', 'Missing account type. Please choose an account to continue', 'danger')

    } else {
      this.go_to_register();
    }
  }

  go_to_register() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        account_type: this.accounts.selected_type
      }
    };
    this.router.navigate(['/register'], navigationExtras);
  }

}
