/**
 * Created by ndenelson on 01/12/2016.
 */
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    template:`

            <section style="padding-top: 90px;" >
                <div class="jumbotron"  style="text-align: center;">
                    <h1>Register</h1>
                </div>
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
                                <a routerLinkActive="active" routerLink="/account">Already member, login here</a> 
                            </form>
                        </div>
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

    private confirm: string;

    constructor(private usersService: UsersService){}

    onSubmit(){
        console.log('je soumet le formulaire')
        this.usersService.registerUser(this.user).subscribe(
            (data) => {
                console.log(JSON.stringify(data))
            },
            (err) => {
                console.log(JSON.stringify(err))
            },
            () => {
                console.log(`Request completed.`)
            }
        );
    }
}