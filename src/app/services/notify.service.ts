import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  page_title = "Ukanda Coffee";
  isLoading = false;
  
  constructor(public loadingController: LoadingController, public toastCtrl: ToastController,public authService: AuthService) {
    
  }
  async toast_with_icon_color(icon,parsedtest,mycolor) {
   
    let icn = '<ion-icon name="'+icon+'"></ion-icon>';
    const toast = await this.toastCtrl.create({
      message: icn + ' ' + parsedtest,
      duration: 3000,
      color: mycolor,
      position: 'bottom',
     // closeButtonText: 'Ok',
     // showCloseButton: true
    });
    toast.present();
  }

  process_errors(errordata: any){
    console.log(errordata);
    //check timeout error
    if(errordata.name === "TimeoutError"){
      this.toast_with_icon_color('close-circle-sharp',errordata.message,'danger')
    }else{
      
    //check error
    if(errordata.error.error){
      this.toast_with_icon_color('close-circle-sharp',errordata.error.error,'danger')
    }else if(errordata.name){
      this.toast_with_icon_color('close-circle-sharp',errordata.name,'danger')
    }

    }

   }

   async loadingPresent(mymessage) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: mymessage,
      spinner: 'bubbles',
      translucent: true,
      cssClass:'custom-loader-class'
      //duration: 8000
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }

}
