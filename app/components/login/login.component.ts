/**
 * Created by ndenelson on 01/12/2016.
 */
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    template: `
        
            <!-- Intro Section -->
            <section style="padding-top: 90px;">
                <div class="jumbotron" style="text-align: center;">
                    <h1>Sign in</h1>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-offset-4 col-sm-4    ">
                            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                              <label for="email" >Email</label>
                              <input type="email" name="email" class="form-control" id="email" placeholder="Email" [(ngModel)]="user.email" required #test>
                               <br/> 
                              <label for="password">Password</label>
                              <input type="password" name="password" class="form-control" id="password" placeholder="Password" [(ngModel)]="user.password" required>
                              <br/>
                              <input name="remember" type="checkbox" [(ngModel)]="remember"> Remember me
                              <br/><br/>
                              <button type="submit" class="btn btn-default btn-lg btn-block" [disabled]="!loginForm.form.valid" >Sign in</button>
                              
                              <button class="btn btn-primary btn-lg btn-block">Login with Facebook</button>
                              <br/>
                              <a routerLinkActive="active" routerLink="/register">Not yet member, register here</a>
                            </form>
            
                        </div>
                    </div>
                </div>
            </section>
        
        `
})

export class LoginComponent{
    private user: User = {
        email: '',
        password: '',
        apikey: ''
    };

    private remember = true;

    onSubmit(){
        this.usersService.loginUser(this.user);
    }

    constructor(private usersService: UsersService){}
}
