import { AuthService } from 'src/app/services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { Facebook } from '@ionic-native/facebook/ngx';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Firebase } from '@ionic-native/firebase/ngx';

import { IonicSelectableModule } from 'ionic-selectable';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'
import { FCM } from '@ionic-native/fcm/ngx';
import { DEFAULT_TIMEOUT } from './services/auth.service';
//import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,AngularFirestoreModule,
    HttpClientModule,
    IonicSelectableModule,
    NgxMaskIonicModule.forRoot()

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,Facebook,CookieService,Firebase, FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }],
  [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
