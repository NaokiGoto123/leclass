import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CreateLessonComponent } from '../shell/create-lesson/create-lesson/create-lesson.component';

@Injectable({
  providedIn: 'root'
})
export class LessonEditorGuard implements CanDeactivate<CreateLessonComponent> {
  canDeactivate(
    component: CreateLessonComponent,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.form.pristine || component.isComplete) {
        return true;
      }

      const confirmation = window.confirm('Your work will be lost. Is it okay?');

      return of(confirmation);
  }
}
