import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {
  // API path
  server = 'https://ukandaledge.com/app/api_v4/';
  mydefault_request_timeout = 5000;
  cart_data = { cartsecurityuser: '', cart_list: [], cart_coupon_code: ''};
  cart_count: Subject<number> = new Subject<number>();
  
  constructor(private http: HttpClient, private cookieService: CookieService, @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number ) {
    console.log('Hello service provider');
   }
   
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(req).pipe(timeout(timeoutValueNumeric));
  }
  
   check_mobile_cart() {
    //check cart cookie
    const cookieExists: boolean = this.cookieService.check('mobilecart');
    if (cookieExists == true) {
      const mycookiedata = JSON.parse(this.cookieService.get('mobilecart'));
      for (let i = 0; i < mycookiedata.length; i++) {
        this.cart_data.cart_list.push(mycookiedata[i]);
      }
      
    }
  }

  add_product_to_cart(item_data) {
    // console.log(item_data);
     const cart_item = { prod_id: '', prod_qty: 1 };
 
     if (item_data.prod_id !== '') {
       //check if item in cart exists
       const found = this.cart_data.cart_list.some(el => el.prod_id === item_data.prod_id);
       if (!found) {
         //not found add
         cart_item.prod_id = item_data.prod_id;
         
         //create temporary array
         let temp_array = [];
         temp_array.push(cart_item);
         //merge both arrays
         //Array.prototype.push.apply(this.cart_data,temp_array);
         this.cart_data.cart_list = this.cart_data.cart_list.concat(temp_array);
 
         this.set_cookie(this.cart_data.cart_list);
         //this.cookieService.set('cart', JSON.stringify(this.cart_data.cart_list), 2,'/','localhost',false,"Strict");
 
         //console.log(this.cart_data);
         this.cart_count.next(this.cart_data.cart_list.length);
 
         //notify
       //  this.Notify.toast_with_icon_color('checkmark-circle-sharp',item_data.prod_name+' added to cart','matfacebook')
       return 'added'

       } else {
         //update
         //let searchitem = this.cart_data.cart_list.find(item => item.prod_id == item_data.p_id).prod_qty;
         this.cart_data.cart_list.find(item => item.prod_id == item_data.prod_id).prod_qty +=1
         //console.log(this.cart_data.cart_list.find(item => item.prod_id == item_data.p_id));
         //delete cookie
         this.cookieService.delete('cart');
         //set cookie
         //this.cookieService.set('cart', JSON.stringify(this.cart_data.cart_list));
         this.set_cookie(this.cart_data.cart_list);
        // this.Notify.toast_with_icon_color('checkmark-circle-sharp',item_data.prod_name+' has been updated','matfacebook')
        return 'updated'
       }
 
     }
 
   }
 
   delete_cookie_item(item_id) {
     const cookieExists: boolean = this.cookieService.check('mobilecart');
     if (cookieExists == true) {
       let mycookiedata = JSON.parse(this.cookieService.get('mobilecart'));
       //check if item exists in cookie
       const found = mycookiedata.some(el => el.prod_id === item_id);
       if (found) {
         //found
         mycookiedata = mycookiedata.filter(obj => obj.prod_id !== item_id);
         this.cart_data.cart_list = mycookiedata;
         //save cookie
         //this.cookieService.set('cart', JSON.stringify(mycookiedata));
         this.set_cookie(mycookiedata);
         //updated counted cart list
         this.cart_count.next(this.cart_data.cart_list.length);
 
         return true;
       }else{
         //NOT found
         return false;
       }
     }else{
       return false;
     }
   }
 
   set_cookie( cookiedata ){
     this.cookieService.set('mobilecart', JSON.stringify(cookiedata), 2,'/','localhost',false,"Strict");
   }
 
   set_login_cookie( userjwt ){
     this.cookieService.set('user', JSON.stringify(userjwt), 2,'/','localhost',false,"Strict");
   }

   delete_cookie(){
     this.cookieService.delete('mobilecart');
     this.cart_data.cart_list = [];
     this.cart_count.next(0);
   }

   /* post_without_tokens(credentials, type) {
    const myheaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    }
     this.http.sendRequest(this.server + type, 
      {
        method: 'post',
        data: credentials,
        headers: myheaders,
        timeout: 6000
     })
    .then(response => {
        // prints 200
        console.log(response);
        return response;
      })
      .catch(response => {
        // prints 403
        console.log(response);
        return response;
      });
      
  } */

  post_without_tokens(credentials, type) {
    const headers = new HttpHeaders({timeout: `${this.mydefault_request_timeout}`});
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:object-literal-shorthand
      this.http.post(this.server + type, JSON.stringify(credentials), { headers: headers })
      .pipe(retry(2))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

   post_with_tokens(credentials, type) {
    const usertoken: string = JSON.parse(localStorage.getItem('AuthData'));

    const httpHeader = {
      headers: new HttpHeaders({
        timeout: `${this.mydefault_request_timeout}`,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*', 
        Authorization: 'Bearer ' + usertoken 
      })
    };
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:object-literal-shorthand
      this.http.post(this.server + type, JSON.stringify(credentials), httpHeader)
      .pipe(retry(2))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_with_Auth(type) {
    const usertoken = JSON.parse(localStorage.getItem('AuthData'));
    const httpHeader = {
      headers: new HttpHeaders(
        {
          timeout: `${this.mydefault_request_timeout}`,
          'Content-Type': 'authorization', 
        'Access-Control-Allow-Origin': '*', 
        Authorization: 'Bearer ' + usertoken?.token 
      })
    };
    return new Promise((resolve, reject) => {
     this.http.get(this.server + type, httpHeader)
     .pipe(retry(2))
      .subscribe(res => {
       resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  get_without_tokens(type) {
    return new Promise((resolve, reject) => {
     this.http.get(this.server + type)
     .pipe(retry(2))
      .subscribe(res => {
       resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  } 


}
