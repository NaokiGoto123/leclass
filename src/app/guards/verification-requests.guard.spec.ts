import { TestBed } from '@angular/core/testing';

import { VerificationRequestsGuard } from './verification-requests.guard';

describe('VerificationRequestsGuard', () => {
  let guard: VerificationRequestsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificationRequestsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
