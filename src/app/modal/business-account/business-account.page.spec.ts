import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessAccountPage } from './business-account.page';

describe('BusinessAccountPage', () => {
  let component: BusinessAccountPage;
  let fixture: ComponentFixture<BusinessAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
