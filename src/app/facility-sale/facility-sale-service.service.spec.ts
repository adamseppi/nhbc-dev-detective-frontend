import { TestBed, inject } from '@angular/core/testing';

import { FacilitySaleServiceService } from './facility-sale-service.service';

describe('FacilitySaleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilitySaleServiceService]
    });
  });

  it('should be created', inject([FacilitySaleServiceService], (service: FacilitySaleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
