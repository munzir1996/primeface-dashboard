import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoPendingDeliveryModalComponent } from './so-pending-delivery-modal.component';

describe('SoPendingDeliveryModalComponent', () => {
  let component: SoPendingDeliveryModalComponent;
  let fixture: ComponentFixture<SoPendingDeliveryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoPendingDeliveryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoPendingDeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
