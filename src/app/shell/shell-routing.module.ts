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
        path: 'languageandliterature-sl',
        loadChildren: () =>
        import('./languageandliterature-sl/languageandliterature-sl.module').then((m) => m.LanguageandliteratureSlModule)
      },
      {
        path: 'japanese-sl',
        loadChildren: () =>
        import('./japanese-sl/japanese-sl.module').then((m) => m.JapaneseSlModule)
      },
      {
        path: 'analysisandapproaches-hl',
        loadChildren: () =>
        import('./analysisandapproaches-hl/analysisandapproaches-hl.module').then((m) => m.AnalysisandapproachesHlModule)
      },
      {
        path: 'physics-hl',
        loadChildren: () =>
        import('./physics-hl/physics-hl.module').then((m) => m.PhysicsHlModule)
      },
      {
        path: 'computerscience-hl',
        loadChildren: () =>
        import('./computerscience-hl/computerscience-hl.module').then((m) => m.ComputerscienceHlModule)
      },
      {
        path: 'economics-sl',
        loadChildren: () =>
        import('./economics-sl/economics-sl.module').then((m) => m.EconomicsSlModule)
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
        path: 'about',
        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
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
