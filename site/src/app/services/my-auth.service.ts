import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var WRTLock: any;

@Injectable()
export class AuthWRT {
    
    private lock: any; 

    constructor(private router: Router){
        // this.lock.initConfig();
        this.lock = new WRTLock();
        this.lock.loginCallback = function(profile: any){
            if(profile){
                localStorage.setItem('profile', JSON.stringify(profile));
                // console.log('profile define in the');
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
        this.router.navigate(['/home']);
    }
}