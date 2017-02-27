import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: '',
    template:`
        <div class="page-header">
            <h1>{{profile.email}} <small>details</small></h1>
        </div>
        <div class="row well">
            <div class="col-xs-3">
                <label>Email :</label><br/>
                <label>Public key : </label><br/>
                <label>Private key :</label><br/>
            </div>
            <div class="col-xs-9">
                <label>{{profile.email}}</label><br/>
                <label>{{profile.apikey}}</label><br/>
                <label>{{profile.privatekey}}</label><br/>
            </div>
        </div>
    `
})
export class DetailsComponent implements OnInit{
    profile: any;
    
    constructor(){

    }
    
    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile.email);
    }
}