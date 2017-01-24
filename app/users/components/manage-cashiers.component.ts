import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service';
import { Cashier } from '../../models/cashier';

@Component({
    template: `
        <h1>Manage cashiers</h1>
        <circle-loader *ngIf="showTableDataLoader" role="alert"></circle-loader>

        <div *ngIf="!showTableDataLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <td>Num</td>
                    <td>Name</td>
                    <td>Phone number</td>
                    <td>Action</td>
                <tr>
                <tr *ngFor="let cashier of cashiers">
                    <td>#</td>  
                    <td>{{cashier.name}}</td>
                    <td>{{cashier.phone}}</td>
                    <td>
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </td>
                </tr>
                <tr *ngIf="cashiers.length == 0">
                    <td colspan="5"><h2 style="text-align: center;">No cashiers</h2></td>
                </tr>
            </table>
        </div>


        <div *ngIf="!showForm" class="form-group" style="margin-top: 30px;">
            <button (click)="addCashier()" class="btn btn-primary">Add new cashier</button>
        </div>

        <div *ngIf="showForm" class="jumbotron" style="margin-bottom: 30px;">
            <div *ngIf="showAlertMessage" class="alert alert-danger" role="alert">{{message}}</div>
            <form (ngSubmit)="onSubmit()" class="form-horizontal" #registerForm="ngForm" >
                <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">Name</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="cashier.name" type="text" class="form-control" name="name" id="name" placeholder="Name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="adress" class="col-sm-3 control-label">Adress</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="cashier.adress" type="text" class="form-control" name="adress" id="adress" placeholder="Adress">
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="col-sm-3 control-label">Em@il</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="cashier.email" type="text" class="form-control" name="email" id="email" placeholder="Em@il adress">
                    </div>
                </div>
                <div class="form-group">
                    <label for="phone" class="col-sm-3 control-label">Phone number</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="cashier.phone" type="text" class="form-control" name="phone" id="phone" placeholder="Phone number">
                    </div>
                </div>
                <div class="form-group">
                    <label for="code" class="col-sm-3 control-label">Cashier code</label>
                    <div class="col-sm-6">
                        <input [(ngModel)]="cashier.code" type="text" class="form-control" name="code" id="code" placeholder="Secret code">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button *ngIf="!saveLoader" type="submit" class="btn btn-primary">Create cashier</button>
                        <bar-loader *ngIf="saveLoader"></bar-loader>
                    </div>
                </div>
            </form>
        </div>
    `
})
export class ManageCashiersComponent implements OnInit {
    private showTableDataLoader = true;
    private showForm = false;
    private showAlertMessage = false;
    private saveLoader = false;
    private message: string;
    private userId: string;
    private profile: any;
    private cashiers: Cashier[];
    private cashier: Cashier;

    addCashier(){
        this.showForm = true;
    }

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1];
        this.resetForm();

        this.userService.getCashier(this.userId).then(
            (data) => {
                this.showTableDataLoader = false;
                if(!data.err){
                    this.cashiers = data.data;
                }
            },
            (err) => {
                console.log(err);
                this.showTableDataLoader = false;
            }
        );
    }

    verifiedCashier(){
        return (this.cashier.phone == null || this.cashier.phone.trim() == '' || this.cashier.name == null || this.cashier.name.trim() == '' || this.cashier.code == null)
    }

    onSubmit(){
        console.log('Je suis dans le onsubmit');
        this.saveLoader = true; 
        if(this.verifiedCashier() == true){
            this.message = "Fill all required fields."
            this.showAlertMessage = true;
            this.resetAlert();
        }else{
            console.log('Test is ok');
            console.log(this.cashier);
            this.userService.saveCashier(this.cashier).then(
                (data) => {
                    console.log(data);
                    this.saveLoader = false;
                    this.showForm = false;
                    if(!data.err){
                        console.log(`Enregistrememnt ok`);
                        this.cashiers[this.cashiers.length] = data.data;
                    }
                },
                (err) => {
                    console.log('Error occur');
                }
            )
        }
        
    }

    resetForm(){
        this.cashier = {name: "",adress: "",email: "",phone: "",code: 0,user: "", _id: ""};
        var min = 10000;
        var max = 99999;
        this.cashier.code = Math.floor(Math.random() * (max - min + 1)) + min;
        this.cashier.user = this.userId;
    }

    resetAlert(){
        setTimeout(()=>{ 
            this.saveLoader = false;
            this.showAlertMessage= false;
         }, 3000);
        
    }

    constructor(private userService: UsersService, private auth: Auth){}
}