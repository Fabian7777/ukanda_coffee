import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Make order',
      url: '/order',
      icon: 'cart'
    },
    {
      title: 'Check out',
      url: '/cart',
      icon: 'basket'
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: 'calendar'
    },
    {
      title: 'Orders',
      url: '/orders-history',
      icon: 'bookmarks'
    },
    {
      title: 'FAQs',
      url: '/faqs',
      icon: 'help-circle'
    },
    {
      title: "Farmer's tip",
      url: '/folder/Spam',
      icon: 'cash'
    }
  ];
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#573f2c');
    this.splashScreen.hide();
  }

  ngOnInit() {
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }
  }
}
