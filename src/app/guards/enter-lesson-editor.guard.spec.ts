import { TestBed } from '@angular/core/testing';

import { EnterLessonEditorGuard } from './enter-lesson-editor.guard';

describe('EnterLessonEditorGuard', () => {
  let guard: EnterLessonEditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnterLessonEditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
