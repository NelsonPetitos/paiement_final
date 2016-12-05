/**
 * Created by ndenelson on 01/12/2016.
 */
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    template:`
        <section class="section">
            <div class="section-container">
                <div class="container">
                    <section style="padding-top: 90px;" >
                        <!--<div class="jumbotron"  style="text-align: center;">-->
                            <!--<h1>Register</h1>-->
                        <!--</div>-->
                        <div *ngIf="isError" class="alert alert-danger" role="alert">{{ errMsg }}</div>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-offset-4 col-sm-4">
                                    <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                                        <label for="email" >Email</label>
                                        <input type="email" name="email" class="form-control" id="email" placeholder="Email" [(ngModel)]="user.email" required />
                                        <br/>
                                        <label for="password">Password</label>
                                        <input type="password" name="password" class="form-control" id="password" placeholder="Password" [(ngModel)]="user.password" required />
                                        <br/>
                                        <label for="confirm">Confirm</label>
                                        <input type="password" name="confirm" class="form-control" id="confirm" placeholder="Password again"  [(ngModel)]="confirm" required>
                                        <br/>
                                        <button type="submit" class="btn btn-default btn-lg btn-block" [disabled]="!registerForm.form.valid" >Register</button>
                                        
                                        <br/>
                                        <a routerLinkActive="active" routerLink="/login">Already member, login here</a> 
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

export class RegisterComponent {
    private user: User = {
        email: "",
        password: "",
        apikey: ""
    };
    private isError = false;
    private errMsg : string;

    private confirm: string;

    constructor(private usersService: UsersService){}

    onSubmit(){
        this.usersService.registerUser(this.user).then(
            (data) => {
                this.isError = data.err;
                this.errMsg = data.msg;
                if(!data.err){
                    console.log(`il faut redirriger vers le compte`);
                }
            },
            (err) => {
                console.log(err)
            }
        );
    }
}