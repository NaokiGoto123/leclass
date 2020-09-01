import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthGuard } from '../guards/auth.guard';
import { IbDpModule } from './ib-dp/ib-dp.module';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject/subject.module').then((m) => m.SubjectModule)
      },
      {
        path: 'ib-dp',
        loadChildren: () => import('./ib-dp/ib-dp.module').then((m) => m.IbDpModule)
      },
      {
        path: 'lesson',
        loadChildren: () => import('./lesson/lesson.module').then((m) => m.LessonModule)
      },
      {
        path: 'create-lesson',
        loadChildren: () => import('./create-lesson/create-lesson.module').then((m) => m.CreateLessonModule)
      },
      {
        path: 'verification',
        loadChildren: () => import('./verification/verification.module').then((m) => m.VerificationModule)
      },
      {
        path: 'verification-requests',
        loadChildren: () => import('./verification-requests/verification-requests.module').then((m) => m.VerificationRequestsModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then((m) => m.ListModule)
      },
      {
        path: 'drafts',
        loadChildren: () => import('./drafts/drafts.module').then((m) => m.DraftsModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then((m) => m.ReportModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule)
      },
      {
        path: 'report-detail',
        loadChildren: () => import('./report-detail/report-detail.module').then((m) => m.ReportDetailModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
      },
      {
        path: 'profile-settings',
        loadChildren: () => import('./profile-settings/profile-settings.module').then((m) => m.ProfileSettingsModule)
      },
      {
        path: '**',
        loadChildren: () => import('./unknown/unknown.module').then((m) => m.UnknownModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
