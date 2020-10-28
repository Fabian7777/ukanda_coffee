import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
})
export class OrdersHistoryPage implements OnInit {

  activities:any;
  words = ["angular", "communication", "tooling", "services", "design", "workshop", "food","documentation","navigation"];
  
  constructor() { }

  ngOnInit() {
  }

}
