import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoRequestDeliveryModalComponent } from './so-request-delivery-modal.component';

describe('SoRequestDeliveryModalComponent', () => {
  let component: SoRequestDeliveryModalComponent;
  let fixture: ComponentFixture<SoRequestDeliveryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoRequestDeliveryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoRequestDeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
