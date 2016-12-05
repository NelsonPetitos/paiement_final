/**
 * Created by ndenelson on 01/12/2016.
 */
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { Router } from "@angular/router";

@Component({
    template: `
        <section class="section">
            <div class="section-container">
                <div class="container">
                    <!-- Intro Section -->
                    <section style="padding-top: 90px;">
                        <!--<div class="jumbotron" style="text-align: center;">-->
                            <!--<h1>Sign in</h1>-->
                        <!--</div>-->
                        <div *ngIf="isError" class="alert alert-danger" role="alert">{{errMsg}}</div>
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
                                      
                                      <!--<button class="btn btn-primary btn-lg btn-block"  (click)="makeGet()" >Login with Facebook</button>-->
                                      <br/>
                                      <a routerLinkActive="active" routerLink="/register">Not yet member, register here</a>
                                    </form>
                    
                                </div>
                            </div>
                        </div>
                    </section>
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

    isError: boolean = false;
    errMsg: string = "test de message d'erreur";

    private remember = true;

    onSubmit(){
        this.usersService.loginUser(this.user).then(
            (data) => {
                this.isError = data.err;
                this.errMsg = data.msg;
                if(!data.err){
                    console.log(`login sucess !!!!`)
                    this.router.navigate(['account'])
                }

            },
            (err) => {
                console.log(err)
            }
        );
    }

    makeGet(){
        this.usersService.testGet().then(
            (data) => {
                console.log(`Tout c'est bien passe dans le test ${data.email}`)
            },
            (err) => {
                console.log(`une erreur c'est produite`)
            }
        );
    }

    constructor(private usersService: UsersService, private router: Router){}
}
