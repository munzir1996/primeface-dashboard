import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversPendingOrdersComponent } from './drivers-pending-orders.component';

describe('DriversPendingOrdersComponent', () => {
  let component: DriversPendingOrdersComponent;
  let fixture: ComponentFixture<DriversPendingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversPendingOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversPendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
