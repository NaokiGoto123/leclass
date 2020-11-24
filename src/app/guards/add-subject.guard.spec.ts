import { TestBed } from '@angular/core/testing';

import { AddSubjectGuard } from './add-subject.guard';

describe('AddSubjectGuard', () => {
  let guard: AddSubjectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddSubjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
