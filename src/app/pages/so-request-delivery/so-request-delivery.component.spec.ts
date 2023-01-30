import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoRequestDeliveryComponent } from './so-request-delivery.component';

describe('SoRequestDeliveryComponent', () => {
  let component: SoRequestDeliveryComponent;
  let fixture: ComponentFixture<SoRequestDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoRequestDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoRequestDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
