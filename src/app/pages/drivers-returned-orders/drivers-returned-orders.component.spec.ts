import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversReturnedOrdersComponent } from './drivers-returned-orders.component';

describe('DriversReturnedOrdersComponent', () => {
  let component: DriversReturnedOrdersComponent;
  let fixture: ComponentFixture<DriversReturnedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversReturnedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversReturnedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
