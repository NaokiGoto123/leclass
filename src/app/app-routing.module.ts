import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundModule } from './notfound/notfound.module';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./shell/shell.module').then((m) => m.ShellModule)
  },
  {
    path: '**',
    loadChildren: () => import('./notfound/notfound.module').then((m) => m.NotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
