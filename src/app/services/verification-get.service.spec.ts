import { TestBed } from '@angular/core/testing';

import { VerificationGetService } from './verification-get.service';

describe('VerificationGetService', () => {
  let service: VerificationGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
