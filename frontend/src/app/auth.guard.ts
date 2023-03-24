import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly oidcSecurityService: OidcSecurityService,
              private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean | UrlTree>(resolve => {
      this.oidcSecurityService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          resolve(true);
        } else {
          this.router.navigateByUrl('');
          resolve(false);
        }
      });
    });
  }

}
