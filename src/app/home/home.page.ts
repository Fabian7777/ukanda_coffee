import { LocationService } from './../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Dynamic parameters for this component's route: /example-params/:first/:second
  routeParams: Params;
  // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
  queryParams: Params;

  accountData: any;
  ip_country = '';
  ip_currency = '';

  isLoading: boolean = false;

    // Readable Address
    address: string;
    // Location coordinates
    latitude: number;
    longitude: number;
    accuracy: number;
    //Geocoder configuration
    geoencoderOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

  constructor(private activatedRoute: ActivatedRoute, public router: Router,public Notify: NotifyService, public authService: AuthService, private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder, public locationservice: LocationService) { 

  //  this.check_location_service();

  }

  check_location_service(){
//check location perssion
this.locationservice.checkLocationEnabled().then((data: any) => {
  let myresponsedata: any = data;
  console.log(myresponsedata);
}, (err) => {
 
console.log(err);
 //redirect to error page
 this.router.navigate(['/location-error'], { queryParams: { red: this.router.url, 'error': err } });
}); 
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
    });

  }

   //Get current coordinates of device
   getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  ngOnInit() {
    this.load_guide();
  /*   setTimeout(() => {
      
  }, 5000); */

 
  }

  load_guide() {
    //start load
    this.isLoading = true;

    //Api connections
    this.authService.get_with_Auth('myaccount').then((data: any) => {

      let responsedata = data;
      console.log(responsedata);

      if (responsedata.code == "200") {
        //user account data
        this.accountData = responsedata?.user_data;
        //ipdata
        this.ip_country = responsedata?.country;
        this.ip_currency = responsedata?.currency;
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

  open_order(){
this.router.navigate(['/order']);
  }

}
