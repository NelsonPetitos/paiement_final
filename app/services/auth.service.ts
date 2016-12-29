import { Injectable }      from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { UsersService } from './users.service';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth{
  // Configure Auth0
  lock = new Auth0Lock('cWFTi1Iyjw0EtXPaySXxZRmfvxYkdKa3', 'ndenelson.auth0.com', {
    rememberLastLogin: false,
    theme: {
      logo: 'https://paiementback.herokuapp.com/assets/img/logo.png'
    },
    auth: {
      redirect: true,
      // redirectUrl: 'http://192.168.15.193:5000/home',
      // redirectUrl: 'http://localhost:5000/home',
      redirectUrl: 'https://paiementback.herokuapp.com/home',
      responseType: 'token'
    },
    languageDictionary: {
      emailInputPlaceholder: "youremail@domain.com",
      title: "Log in or sign up"
    }
  });

  constructor(private router: Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult: any) => {
        this.lock.getProfile(authResult.idToken, function(err:any, profile: any){
            if(err){
                throw new Error(err);
            }
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
        })
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/home']);
  }
}