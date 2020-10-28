import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {

  @ViewChild("cc", { read: ElementRef, static:true }) cardContent:any;
  accordianExpanded = false;
  @Input('title') title: string;
  @Input('mydata') mydata: string;

  
  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setStyle(this.cardContent.nativeElement, "webkitTransition","max-height 400ms, padding 400ms");
  }

  toggleaccording(){

    if(this.accordianExpanded){

      this.renderer.setStyle(this.cardContent.nativeElement, "max-height","0px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding","0px 16px");

    }else{

      this.renderer.setStyle(this.cardContent.nativeElement, "max-height","1000px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding","13px 16px");

      }

      this.accordianExpanded = !this.accordianExpanded;
     
    }


}
