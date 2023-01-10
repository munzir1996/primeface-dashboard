import { TestBed } from '@angular/core/testing';

import { DigiDeliveryApiService } from './digi-delivery-api.service';

describe('DigiDeliveryApiService', () => {
  let service: DigiDeliveryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiDeliveryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
