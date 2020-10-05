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
      map((isLoggedin) => {
        if (!isLoggedin) {
          this.router.navigateByUrl('/login');
          return false;
        }
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
      map((isLoggedin) => {
        if (!isLoggedin) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }
}
