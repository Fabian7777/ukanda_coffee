
import { FcmService } from './../../services/fcm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public loading;
  loginData = {email:'', password:'', fcm:''};

  constructor(private menu: MenuController,private router: Router,private fb: Facebook,public loadingController: LoadingController,private fireAuth: AngularFireAuth, public Notify: NotifyService, public authService: AuthService, public fcmService: FcmService) {
    this.menu.enable(false);
   }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }

  login() {
    let device_token : any;
   // device_token = this.fcmService.getToken();

   // this.loginData.fcm = device_token;

    // validate user data
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.loginData.email === '') {
      this.Notify.toast_with_icon_color('close-circle-sharp', 'Missing account email', 'danger')

    } else if (!re.test(this.loginData.email)) {
      this.Notify.toast_with_icon_color('close-circle-sharp', 'Invalid account email', 'danger')

    } else if (this.loginData.password === '') {
      this.Notify.toast_with_icon_color('close-circle-sharp', 'Missing account password', 'danger')

    } else {

      this.login_script();
      
    }
  }

  login_script() {

    this.Notify.loadingPresent('Logging in ...');
   
    // Api connections
   this.authService.post_without_tokens(this.loginData, 'login').then((data: any) => {

      let myresponsedata: any = data;
      console.log(myresponsedata);

      // close load
      this.Notify.loadingDismiss();

      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
        this.Notify.toast_with_icon_color('checkmark-circle-sharp', myresponsedata.msg, 'mygreen')

        // create localstorage to assign data
        //localStorage.setItem('device_token', JSON.stringify(myresponsedata.jwt));

        this.router.navigate(["/home"]);

      }

    }, (err) => {

      // close load
      this.Notify.loadingDismiss();
      //parse error
      this.Notify.process_errors(err);
     

    }); 
  }

  async facebook_login() {
    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + error);
      });
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    console.log(res);
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/home']);
        this.loading.dismiss();
      });

  }

  async account_selection_Modal() {
    this.router.navigate(['/account-selection']);
  }


}
