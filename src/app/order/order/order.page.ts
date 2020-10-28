import { OrderGuidePage } from './../../modal/order-guide/order-guide.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Coffee grade',
   // subHeader: 'Select your favorite color'
  };
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async show_guide() {
    const modal = await this.modalController.create({
      component: OrderGuidePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
