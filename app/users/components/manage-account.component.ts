import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';

import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service';

@Component({
    template: `
        <h1>Manage accounts</h1>
        <div *ngIf="!showLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                <td>Num</td>
                    <td>Account Number</td>
                    <td>Action</td>
                <tr>
                <tr *ngFor="let account of accounts">
                    <td>#</td>
                    <td>{{account.num}}</td>
                    <td>
                        <span *ngIf="account._id === defaultAccountID" (click)="setDefault(account._id)" class="glyphicon glyphicon-check" aria-hidden="true"></span>
                        <span *ngIf="account._id !== defaultAccountID" (click)="setDefault(account._id)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                        &nbsp;&nbsp;&nbsp;
                        <span *ngIf="deletionLoderAccountId !== account._id" (click)="deleteAccount(account._id)" class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        <bar-loader *ngIf="deletionLoderAccountId === account._id"></bar-loader>
                    </td>
                </tr>
                <tr *ngIf="accounts.length == 0">
                    <td colspan="3"><h2 style="text-align: center;">No accounts.</h2></td>
                </tr>
            </table>
        </div>
        
        <circle-loader *ngIf="showLoader" role="alert"></circle-loader>

        <div *ngIf="!showForm" class="form-group" style="margin-top: 30px;">
            <button (click)="addAccount()" class="btn btn-primary">Add new account</button>
        </div>

        

        <div *ngIf="showForm" class="jumbotron" style="margin-bottom: 30px;">
            <div *ngIf="showAlert" class="alert alert-danger" role="alert">{{message}}</div>
            <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="form-horizontal">
                <div class="form-group">
                    <input type="text" [(ngModel)]="account.num" class="form-control" id="account" placeholder="Account number" name="num" required>
                </div>
                <div class="form-group">
                    <button *ngIf="!saveLoading" type="submit" class="btn btn-primary">Add</button>
                    <circle-loader *ngIf="saveLoading"></circle-loader>
                </div>
            </form>
        </div>

        

    `
})
export class ManageAccountComponent implements OnInit{
    showForm = false;
    showLoader = true;
    saveLoading = false;
    showAlert = false;
    accounts : Account[] = []
    profile: any;
    userId: string;
    account: Account;
    index = 1;
    defaultAccountID = '';
    deletionLoderAccountId = "";
    message = '';

    setDefault(id: string){
        console.log(id);
        this.defaultAccountID = id;
        //make some update in the database.
    }

    deleteAccount(id: string){
        this.deletionLoderAccountId = id;
        this.usersService.deleteAccount(id).then(
            (data) => {
                this.deletionLoderAccountId = "";
                var tmp: Account[] = [];
                var i = 0;
                if(!data.err){
                    console.log(`Supression Ok`);
                    for(var account of this.accounts){
                        if(account._id != data.data._id){
                            tmp[i] = account;
                            i = i + 1;
                        }
                    }
                    this.accounts = tmp;
                }
            },
            (err) => {
                console.log(err)
                this.deletionLoderAccountId = "";
            }
        )
    }

    onSubmit(){
        this.saveLoading = true;
        if(this.account.num === null || this.account.num.trim() === ''){
            this.message = "Account number empty."
            this.showAlert = true;
            setTimeout(()=>{ this.resetAlert() }, 3000);
            return;
        }
        this.usersService.saveAccount(this.account).then(
            (data) => {
                this.saveLoading = false;
                this.account.num = '';
                this.showForm = false;
                if(!data.err){
                    console.log(`Enregistrememnt ok`);
                    this.accounts[this.accounts.length] = data.data;
                }
            },
            (err) => {
                this.saveLoading = false;
                console.log(err)
            }
        );
    }

    addAccount(){
        this.showForm = true
    }

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1]
        this.usersService.getAccount(this.userId).then(
            (data) => {
                this.showLoader = false;
                // this.isError = data.err;
                // this.errMsg = data.msg;
                if(!data.err){
                    console.log(`Tout est ok`);
                    this.accounts = data.data;
                }
            },
            (err) => {
                console.log(err)
                console.log(`une erreur c'est produite`);
                this.showLoader = false;
            }
        );
        this.account = {user: this.userId, num: '', _id: ''};
    }

    resetAlert(){
        this.saveLoading = false;
        this.showAlert = false;
    }

    constructor(private usersService: UsersService, private auth: Auth){
    }
}