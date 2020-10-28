import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderGuidePage } from './order-guide.page';

describe('OrderGuidePage', () => {
  let component: OrderGuidePage;
  let fixture: ComponentFixture<OrderGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
