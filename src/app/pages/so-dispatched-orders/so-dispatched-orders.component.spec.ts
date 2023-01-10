import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDispatchedOrdersComponent } from './so-dispatched-orders.component';

describe('SoDispatchedOrdersComponent', () => {
  let component: SoDispatchedOrdersComponent;
  let fixture: ComponentFixture<SoDispatchedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoDispatchedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoDispatchedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
