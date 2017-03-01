import { Injectable } from '@angular/core' ;
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthWRT } from './my-auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthWRT, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let url = state.url;
        console.log(url);
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.authenticated()) { return true; }

        // Store the attempted URL for redirecting
        this.auth.setRedirectUrl(url);

        // Navigate to the login page with extras
        this.auth.login();
        return false;
    }
}