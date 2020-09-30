import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private afAuth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afAuth.user$.pipe(
      map((user) => !!user),
      tap((isLoggedin) => {
        if (!isLoggedin) {
          console.log('11');
          this.router.navigateByUrl('/login');
          return false;
        }
        console.log('22');
        return true;
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.user$.pipe(
      map((user) => !!user),
      take(1),
      tap((isLoggedin) => {
        if (!isLoggedin) {
          console.log('33');
          this.router.navigateByUrl('/login');
          return false;
        }
        console.log('44');
        return true;
      })
    );
  }
}
