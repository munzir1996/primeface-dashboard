import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversPickedOrdersComponent } from './drivers-picked-orders.component';

describe('DriversPickedOrdersComponent', () => {
  let component: DriversPickedOrdersComponent;
  let fixture: ComponentFixture<DriversPickedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversPickedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversPickedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
