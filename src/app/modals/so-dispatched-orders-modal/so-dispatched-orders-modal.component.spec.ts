import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDispatchedOrdersModalComponent } from './so-dispatched-orders-modal.component';

describe('SoDispatchedOrdersModalComponent', () => {
  let component: SoDispatchedOrdersModalComponent;
  let fixture: ComponentFixture<SoDispatchedOrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoDispatchedOrdersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoDispatchedOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
