import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationErrorPage } from './location-error.page';

describe('LocationErrorPage', () => {
  let component: LocationErrorPage;
  let fixture: ComponentFixture<LocationErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationErrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
