import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { FcmService } from 'src/app/services/fcm.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
// Dynamic parameters for this component's route: /example-params/:first/:second
  routeParams: Params;
  // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
  queryParams: Params;

  account_type = "";
  isLoading: boolean = true;
  countries_data = [];
  display_countries_data = [];
  registerData = {firstname:'', lastname:'',gender:'',country:'',email:'',password:'',account_type:'',contact:'',company:'',device_fcm:'' }

  repeat_password = "";
  
  constructor(private activatedRoute: ActivatedRoute, public router: Router, public authService: AuthService, public Notify: NotifyService, public fcmService: FcmService, public alertCtrl: AlertController) { 
    this.getRouteParams();
  }
  
  ngOnInit() {
    this.load_currency();
  }

  getRouteParams() {
    // Route parameters
    /* this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
        console.log(this.routeParams);
        this.product_query.ref = this.routeParams.id;
        this.product_name = this.routeParams.name;
    }); */

    // URL query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      console.log(this.queryParams);

      const ac_type  = this.queryParams.account_type;
      if (ac_type === "1"){
        this.account_type = "Personal Account";
        this.registerData.account_type = "basic";

      }else if(ac_type === "2"){
        this.account_type = "Business Account";
        this.registerData.account_type = "business";
      }
      //this.product_ref = this.queryParams.prod;
    });

  }

  load_currency() {
    //start load
    this.isLoading = true;

    //Api connections
    this.authService.get_without_tokens('countries').then((data: any) => {

      let responsedata = data;
      console.log(responsedata);

      if (responsedata.code == "200") {

        this.countries_data = responsedata.msg;
        this.display_countries_data = this.countries_data;
        //pages
       // this.pages = this.paginate(this.countries_data, this.page_size);
       // this.maximum_pages = (Math.ceil(this.countries_data.length/this.page_size));
       // this.display_countries_data =  this.display_page(this.current_page);
       // console.log(this.maximum_pages);
      }

      //close load
      this.isLoading = false;

    }, (err) => {
      //display error
      console.log(err);

      //close load
      this.isLoading = false;

      this.Notify.process_errors(err);

    });
  }


  register(){
    //get token 
   this.registerData.device_fcm = this.fcmService.fcm_get_Token();
  // validate user data
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (this.registerData.firstname === '') {
    this.Notify.toast_with_icon_color('close-circle-sharp','Missing first name','danger')

  }else if (this.registerData.lastname == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Missing last name','danger')

  }else if (this.registerData.gender == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Please choose your gender','danger')

  }else if (this.registerData.country == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Choose your country','danger')

  }else if (this.registerData.contact == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Missing phone contact','danger')

  }else if (this.registerData.email == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Missing account email','danger')

  }else if (!re.test(this.registerData.email)){
    this.Notify.toast_with_icon_color('close-circle-sharp','Invalid user email','danger')

  }else if (this.registerData.password == ""){
    this.Notify.toast_with_icon_color('close-circle-sharp','Missing account password','danger')

  }else if (this.registerData.password !== this.repeat_password){
    this.Notify.toast_with_icon_color('close-circle-sharp','Passwords do NOT match','danger')

  }else{
    this.register_confirm();
  }

  }

  async register_confirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Account creation',
      message: 'Are you sure '+this.registerData.firstname+' you want to create your Ukanda Coffee account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Create',
          handler: () => {
            console.log('Confirm Okay');
            this.register_script();
          }
        }
      ]
    });
  
    await alert.present();
  }
  register_script(){  
      this.Notify.loadingPresent('Creating account ...');
      // Api connections
      this.authService.post_without_tokens(this.registerData, 'register').then((data: any) => {
  
      let myresponsedata: any = data;
      console.log(myresponsedata);
  
       // close load
      this.Notify.loadingDismiss();
     
      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
        this.Notify.toast_with_icon_color('checkmark-circle-sharp',myresponsedata.msg,'mygreen')
  
        let authdata = {token:myresponsedata?.jwt,source:myresponsedata?.token_source};
  
        // save device token
        localStorage.setItem('AuthData', JSON.stringify(authdata));
  
        //parse data to home
        this.router.navigate(['/home'], { queryParams: { firstname: myresponsedata?.firstname, 'lastname': myresponsedata?.lastname,'source': myresponsedata?.token_source } });
       
      }
  
      }, (err) => {
  
      // close load
      this.Notify.loadingDismiss();
      //parse error
      this.Notify.process_errors(err);
      // display error
      console.log(err);
    
      });
  }


}
