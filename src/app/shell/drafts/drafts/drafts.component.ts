import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  drafts: Lesson[];

  constructor(
    private lessonGetService: LessonGetService,
    private authService: AuthService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Drafts | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Drafts' },
      { property: 'og:title', content: 'Drafts' },
      { property: 'og:description', content: 'Drafts'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.lessonGetService.getUnpublishedLessons(this.authService.user.uid).pipe(take(1)).subscribe((drafts: Lesson[]) => {
      this.drafts = drafts;
    });
  }

  ngOnInit(): void {
  }

}
