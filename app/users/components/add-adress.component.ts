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
                    <td>Country</td>
                    <td>City</td>
                    <td>Rue</td>
                    <td>Postal box</td>
                    <td>Phone number</td>
                    <td>Action</td>
                <tr>
                <tr *ngFor="let adress of adresses">
                    <td>#</td>  
                    <td>{{adress.country}}</td>
                    <td>{{adress.town}}</td>
                    <td>{{adress.street}}</td>
                    <td>{{adress.postalbox}}</td>
                    <td>{{adress.phone}}</td>
                    <td>
                        <span (click)="setDefault(adress._id)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;
                        <span (click)="deleteAccount(adress._id)" class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </td>
                </tr>
                <tr *ngIf="adresses.length == 0">
                    <td colspan="7"><h2 style="text-align: center;">No adresses.</h2></td>
                </tr>
            </table>
        </div>


        <my-loader *ngIf="showLoader"></my-loader>


        <div *ngIf="!showForm" class="form-group" style="margin-top: 30px;">
            <button (click)="addAdress()" class="btn btn-primary">Add new adress</button>
        </div>


        <div *ngIf="showForm" class="form-group" style="margin-bottom: 30px;">
            <form class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-2">
                        <select name="code" >
                            <option value="1">+237</option>
                            <option value="2">+222</option>
                            <option value="3">+111</option>
                            <option value="4">+333</option>
                        </select>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="" id="" placeholder="Télephone" />
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-4">
                    <input type="text" class="form-control" name="" id="" placeholder="Boite postale" />
                    </div>
                    <div class="col-sm-5">
                    <input type="text" class="form-control" name="" id="" placeholder="Ville" />
                    </div>
                    <div class="col-sm-3">
                        <select name="contry">
                            <option value="1">Cameroun</option>
                            <option value="2">Togo</option>
                            <option value="3">Gabon</option>
                            <option value="4">Cote d'ivoire</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control" name="" id="" placeholder="Rue" />
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button class="btn btn-primary">Add adress</button>
                    </div>
                </div>
            </form>
        </div>
    `
})

export class AddAdressComponent implements OnInit{
    showForm = false;
    showLoader = true;
    saveLoading = false;
    adresses : Adress[] = []
    adress: Adress;
    profile: any;
    userId = '';

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
        this.adress = { town: '', country: '', postalbox : '', phone : '', street : '', user: this.userId, _id: '',}
        
    }

    addAdress(){
        this.showForm = true
    }
}