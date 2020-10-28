import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

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

  constructor(private activatedRoute: ActivatedRoute, public router: Router,public Notify: NotifyService, public authService: AuthService) { 
    this.getRouteParams();
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

  ngOnInit() {
    setTimeout(() => {
      this.load_guide();
  }, 5000);

 
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

}
