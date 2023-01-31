import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersHeatMapComponent } from './orders-heat-map.component';

describe('OrdersHeatMapComponent', () => {
  let component: OrdersHeatMapComponent;
  let fixture: ComponentFixture<OrdersHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersHeatMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
