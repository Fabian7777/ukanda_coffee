import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebase: Firebase,private platform: Platform, private fcm: FCM) { }

  subscribe_to_Topic(topic_name: string){
    this.fcm.subscribeToTopic(topic_name);
  }

  fcm_get_Token(){
    let fcm_token = "";
    this.fcm.getToken().then(token => {
      fcm_token = token;
    });
    return fcm_token;
  }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
     // token = await this.firebase.getToken();
      this.firebase.getToken().then(ftoken => {
        token = ftoken;
      });
    }

    if (this.platform.is('ios')) {
     // token = await this.firebase.getToken();
     await this.firebase.grantPermission();
     this.firebase.getToken().then(ftoken => {
      token = ftoken;
    });
     
    }
    console.log(token);
    return token;
    
  }

  
  onNotifications() {
    return this.firebase.onNotificationOpen();
  }

}
