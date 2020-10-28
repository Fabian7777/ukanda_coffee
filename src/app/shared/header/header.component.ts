import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  unread = 5;
  dashtitle = "";
  constructor(private menuCtrl: MenuController, private notify: NotifyService) { 
    this.menuCtrl.enable(true);
    this.dashtitle = notify.page_title;
  }

  ngOnInit() {}

}
