import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalAccountPage } from './personal-account.page';

describe('PersonalAccountPage', () => {
  let component: PersonalAccountPage;
  let fixture: ComponentFixture<PersonalAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
