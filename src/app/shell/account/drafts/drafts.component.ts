import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  drafts: Lesson[];

  constructor(
    private lessonGetService: LessonGetService,
    private authService: AuthService
  ) {
    this.lessonGetService.getUnpublishedLessons(this.authService.user.uid).pipe(take(1)).subscribe((drafts: Lesson[]) => {
      this.drafts = drafts;
    });
  }

  ngOnInit(): void {
  }

}
