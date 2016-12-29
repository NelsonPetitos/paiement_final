import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { Adress } from '../../models/adress';

import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service'

@Component({
    template: `
        <h1>Manage Adress</h1>
        <div *ngIf="!showLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <td>Num</td>
                    <td>Phone number</td>
                    <td>Country</td>
                    <td>City</td>
                    <td>Rue</td>
                    <td>Postal box</td>
                    <td>Action</td>
                <tr>
                <tr *ngFor="let adress of adresses">
                    <td>#</td>  
                    <td>(+{{adress.code}}){{adress.phone}}</td>
                    <td>{{adress.country}}</td>
                    <td>{{adress.town}}</td>
                    <td>{{adress.street}}</td>
                    <td>{{adress.postalbox}}</td>
                    <td>
                        <span *ngIf="deletionLoaderAdresstId !== adress._id" (click)="deleteAdress(adress._id)" class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        <bar-loader *ngIf="deletionLoaderAdresstId === adress._id"></bar-loader>
                    </td>
                </tr>
                <tr *ngIf="adresses.length == 0">
                    <td colspan="7"><h2 style="text-align: center;">No adresses.</h2></td>
                </tr>
            </table>
        </div>


        <circle-loader *ngIf="showLoader"></circle-loader>


        <div *ngIf="!showForm" class="form-group" style="margin-top: 30px;">
            <button (click)="addAdress()" class="btn btn-primary">Add new adress</button>
        </div>


        <div *ngIf="showForm" class="jumbotron" style="margin-bottom: 30px;">
            <div *ngIf="showAlert" class="alert alert-danger" role="alert">{{message}}</div>
            <form (ngSubmit)="onSubmit()" class="form-horizontal" #registerForm="ngForm" >
                <div class="form-group">
                    <div class="col-sm-2">
                        <select required class="form-control" name="code" [(ngModel)]="adress.code">
                            <option *ngFor="let code of codes" [value]="code.value">  
                            {{code.display}}
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-10">
                        <input [(ngModel)]="adress.phone" type="phone" class="form-control" name="phone" id="phone" placeholder="Télephone" required />
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input [(ngModel)]="adress.postalbox" type="text" class="form-control" name="postalbox" id="postalbox" placeholder="Boite postale" />
                    </div>
                    <div class="col-sm-5">
                        <input [(ngModel)]="adress.town" type="text" class="form-control" name="town" id="town" placeholder="Ville" />
                    </div>
                    <div class="col-sm-3">
                        <select required class="form-control" name="country" [(ngModel)]="adress.country">
                            <option *ngFor="let country of countries" [ngValue]="country.value">  
                            {{country.display}}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <input [(ngModel)]="adress.street" type="text" class="form-control" name="street" id="street" placeholder="Rue" />
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button *ngIf="!saveLoading" type="submit" class="btn btn-primary">Add adress</button>
                        <circle-loader *ngIf="saveLoading"></circle-loader>
                    </div>
                </div>
            </form>
        </div>
    `
})

export class ManageAdressComponent implements OnInit{
    showForm = false;
    showLoader = true;
    saveLoading = false;
    showAlert = false;
    adresses : Adress[] = []
    adress: Adress;
    profile: any;
    userId = '';
    deletionLoaderAdresstId = '';
    message = '';

    countries = [{value: 'Cameroun', display: 'Cameroun'},
                {value: 'Gabon', display: `Gabon`},
                {value: `Côte d'ivoire`, display: `Côte d'ivoire`},
                {value: 'Sénégal', display: `Sénégal`}];
    codes =     [{value: '237', display: '+237'},
                {value: '123', display: `+123`},
                {value: '234', display: `+234`},
                {value: '567', display: `+567`}];
    defaultCode = '237';
    defaultCountry = 'Cameroun'

    constructor(private usersService: UsersService, private auth: Auth){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1]
        this.usersService.getAdresses(this.userId).then(
            (data) => {
                this.showLoader = false;
                if(!data.err){
                    console.log(`Tout est ok`);
                    this.adresses = data.data;
                }
            },
            (err) => {
                console.log(`une erreur c'est produite`);
                this.showLoader = false;
            }
        );
        this.resetForm();
        
    }

    addAdress(){
        this.showForm = true
    }

    onSubmit(){
        this.saveLoading = true;
        if(this.adress.phone === null || this.adress.phone.trim() === '' || this.adress.postalbox == null || this.adress.postalbox.trim() === '' || this.adress.country == null){
            this.message = "Fill all required fields."
            this.showAlert = true;
            this.resetAlert();
            return;
        }
        this.usersService.saveAdress(this.adress).then(
            (data) => {
                this.saveLoading = false;
                this.showForm = data.err;
                this.message = data.msg;
                this.showAlert = data.err;
                this.resetAlert(); 
                if(!data.err){
                    this.resetForm();
                    this.adresses[this.adresses.length] = data.data;
                }
            },
            (err) => {
                this.saveLoading = false;
                console.log(err)
            }
        );
    }

    deleteAdress(id: string){
        this.deletionLoaderAdresstId = id;
        this.usersService.deleteAdress(id).then(
            (data) => {
                this.deletionLoaderAdresstId = "";
                var tmp: Adress[] = [];
                var i = 0;
                if(!data.err){
                    for(var adress of this.adresses){
                        if(adress._id != data.data._id){
                            tmp[i] = adress;
                            i = i + 1;
                        }
                    }
                    this.adresses = tmp;
                }
            },
            (err) => {
                console.log(err)
                this.deletionLoaderAdresstId = "";
            }
        )
    }

    resetAlert(){
        setTimeout(()=>{ 
            this.saveLoading = false;
            this.showAlert = false;
         }, 3000);
        
    }

    resetForm(){
        this.adress = { town: '', country: this.defaultCountry, postalbox : '', phone : '', street : '', user: this.userId, _id: '', code: this.defaultCode}
    }
}