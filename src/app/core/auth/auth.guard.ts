import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const logged = await this.auth.isLoggedIn();
    if (logged) return true;
    // redirect to login and include intended path
    const redirect = this.router.url || '/app';
    return this.router.createUrlTree(['/login'], { queryParams: { redirect } });
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    return this.canActivate();
  }
}
