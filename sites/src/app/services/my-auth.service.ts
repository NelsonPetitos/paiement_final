import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var WRTLock: any;

@Injectable()
export class AuthWRT {
    
    private lock: any; 
    private redirectUrl = '/home';

    constructor(private router: Router){
        // this.lock.initConfig();
        this.lock = new WRTLock();
        this.lock.loginCallback = (profile: any) =>{
            if(profile){
                localStorage.setItem('profile', JSON.stringify(profile));
                this.router.navigate([this.redirectUrl]);
                console.log(`profile define in the and redirenction done to ${this.redirectUrl}`);
            }
        }
    }

    public login(){
        console.log('Je dois afficher le login');
        this.lock.show();
    }

    public authenticated(){
        return (localStorage.getItem("profile") !== null);
    }

    public logout() {
        localStorage.removeItem('profile');
        this.router.navigate([this.redirectUrl]);
    }

    public setRedirectUrl(url: string){
        console.log(`redirect url set to ${url}`);
        this.redirectUrl = url;
    }
}