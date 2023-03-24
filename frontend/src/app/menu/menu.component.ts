import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserData } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit {

  userData: UserData | null = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public oidcSecurityService: OidcSecurityService) {
  }

  public logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
    this.userData = null;
  }

  public ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
        console.log(userData);
        this.userData = userData;
      });

    this.oidcSecurityService.isAuthenticated().subscribe((isAuthenticated) => {
      console.log('isAuthenticated:', isAuthenticated);
    });
  }

  public login() {
    this.oidcSecurityService
      .authorizeWithPopUp()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        console.log(userData);
        this.userData = userData;
      });
  }

}
