import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service';

@Component({
    template: `
        <h1>Change password </h1>
        <div *ngIf="displayAlertError" class="alert alert-danger" role="alert">{{message}}</div>
        <div *ngIf="displayAlertSucess" class="alert alert-success" role="alert">{{message}}</div>
        <div class="jumbotron">
            <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="form-horizontal">
                <div class="form-group">
                    <label for="oldPassword" class="col-sm-3 control-label">Old password</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="data.oldPassword" type="password" class="form-control" name="oldPassword" id="oldPassword" placeholder="Old password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="newPassword" class="col-sm-3 control-label">New password</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="data.password" type="password" class="form-control" name="newPassword" id="newPassword" placeholder="New password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="confirmPassword" class="col-sm-3 control-label">Confirm password</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="data.confirmPassword" type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <button *ngIf="!saveLoading"  type="submit" class="btn btn-primary">Change password</button>
                        <circle-loader *ngIf="saveLoading"></circle-loader>
                    </div>
                </div>
            </form>
            
        </div>
    `
})
export class ChangePwdComponent {
    message = `Test de message pour l'alert`;
    displayAlertError = false;
    displayAlertSucess = false;
    data = {oldPassword: '', password: '', confirmPassword: '', user: ''}
    profile: any;
    userId = '';
    saveLoading = false;

    constructor(private usersService: UsersService, private auth: Auth){}

    onSubmit(){
        this.saveLoading = true;
        this.displayAlertError = false;
        this.displayAlertSucess = false;

        if(this.data.password !== this.data.confirmPassword || this.data.password == '' || this.data.confirmPassword == '' || this.data.oldPassword == ''){
            this.displayAlertError = true;
            this.message = "Password not matching or empty."
            this.saveLoading = false;
            setTimeout(()=> {this.resetAlert()}, 3000);
        }else{
            this.usersService.changePassword(this.data).then(
                (data) => {
                    this.saveLoading = false;
                    this.message = data.msg;
                    this.displayAlertError = data.err;
                    this.displayAlertSucess = !data.err;
                    this.data = {oldPassword: '', password: '', confirmPassword: '', user: this.userId}
                    setTimeout(()=> {this.resetAlert()}, 4000);
                },
                (err) => {
                    console.log(err);
                    this.saveLoading = false;
                    this.displayAlertError = true;
                    this.displayAlertSucess = false;
                    this.message = "An error occur. Password not change."
                    this.data = {oldPassword: '', password: '', confirmPassword: '', user: this.userId}
                    setTimeout(()=> {this.resetAlert()}, 4000);
                }
            )
        }
    }

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.data.user = this.profile.user_id.split("|")[1]
        this.userId = this.profile.user_id.split("|")[1];
    }

    resetAlert(){
        console.log('reset les variable de controle.')
        this.displayAlertError = false;
        this.displayAlertSucess = false;
    }
}