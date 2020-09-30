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
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      map((user) => !!user),
      tap((isLoggedin) => {
        if (isLoggedin) {
          console.log('1');
          this.router.navigateByUrl('/');
          return false;
        }
        console.log('2');
        return true;
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      map((user) => !!user),
      take(1),
      tap((isLoggedin) => {
        if (isLoggedin) {
          console.log('3');
          this.router.navigateByUrl('/');
          return false;
        }
        console.log('4');
        return true;
      })
    );
  }
}
