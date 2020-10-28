import { Component, ViewChild, OnInit, Renderer2, Input, AfterViewInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

  @ViewChild("cc", { read: ElementRef, static:true }) cardContent:any;
  accordianExpanded = false;
  @Input('title') title: string;
  @Input('mydata') mydata: string;

  constructor(public renderer: Renderer2 ) { 
    console.log('Hello AccordionComponent Component');
  }

  ngOnInit() {
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
