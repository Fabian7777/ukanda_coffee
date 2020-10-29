import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-location-error',
  templateUrl: './location-error.page.html',
  styleUrls: ['./location-error.page.scss'],
})
export class LocationErrorPage implements OnInit {

  constructor(private router: Router, private diagnostic: Diagnostic) { }

  ngOnInit() {
  }
  close_page(){
    //this.navCtrl.back();
    this.router.navigate(['/home']);
  }
  location_settings(){
this.diagnostic.switchToLocationSettings();
  }

}
