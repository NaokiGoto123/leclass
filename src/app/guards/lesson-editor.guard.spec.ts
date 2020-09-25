import { TestBed } from '@angular/core/testing';

import { LessonEditorGuard } from './lesson-editor.guard';

describe('LessonEditorGuard', () => {
  let guard: LessonEditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LessonEditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
