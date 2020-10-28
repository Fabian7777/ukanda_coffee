import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-guide',
  templateUrl: './order-guide.page.html',
  styleUrls: ['./order-guide.page.scss'],
})
export class OrderGuidePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss_modal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
