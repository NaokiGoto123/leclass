import { TestBed } from '@angular/core/testing';

import { LessonGetService } from './lesson-get.service';

describe('LessonGetService', () => {
  let service: LessonGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
