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
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
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
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
      },
      {
        path: 'profile-settings',
        loadChildren: () => import('./profile-settings/profile-settings.module').then((m) => m.ProfileSettingsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
