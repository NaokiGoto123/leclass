import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'add-subject',
        loadChildren: () =>
          import('./add-subject/add-subject.module').then(
            (m) => m.AddSubjectModule
          ),
      },
      {
        path: 'subject',
        loadChildren: () =>
          import('./subject/subject.module').then((m) => m.SubjectModule),
      },
      {
        path: 'lesson',
        loadChildren: () =>
          import('./lesson/lesson.module').then((m) => m.LessonModule),
      },
      {
        path: 'create-lesson',
        loadChildren: () =>
          import('./create-lesson/create-lesson.module').then(
            (m) => m.CreateLessonModule
          ),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'drafts',
        loadChildren: () =>
          import('./drafts/drafts.module').then((m) => m.DraftsModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'report-detail',
        loadChildren: () =>
          import('./report-detail/report-detail.module').then(
            (m) => m.ReportDetailModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'archived-courses',
        loadChildren: () =>
          import('./archived-courses/archived-courses.module').then(
            (m) => m.ArchivedCoursesModule
          ),
      },
      {
        path: 'contributers',
        loadChildren: () =>
          import('./contributers/contributers.module').then(
            (m) => m.ContributersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
