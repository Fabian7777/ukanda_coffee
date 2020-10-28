import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipPage } from './tip.page';

describe('TipPage', () => {
  let component: TipPage;
  let fixture: ComponentFixture<TipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
