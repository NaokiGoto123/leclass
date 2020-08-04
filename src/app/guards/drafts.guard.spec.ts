import { TestBed } from '@angular/core/testing';

import { DraftsGuard } from './drafts.guard';

describe('DraftsGuard', () => {
  let guard: DraftsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DraftsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
