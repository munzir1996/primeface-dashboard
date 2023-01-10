import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoPendingDeliveryRequestsComponent } from './so-pending-delivery-requests.component';

describe('SoPendingDeliveryRequestsComponent', () => {
  let component: SoPendingDeliveryRequestsComponent;
  let fixture: ComponentFixture<SoPendingDeliveryRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoPendingDeliveryRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoPendingDeliveryRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
