import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: '',
    template:`
        <div class="page-header">
            <h1>{{profile.email}} <small>details</small></h1>
        </div>
        <div class="row well">
            <ol>
                <li>Email : {{profile.email}}</li>
                <li>Public key : {{profile.apikey}}</li>
                <li>Private key : {{profile.privatekey}}</li>
            </ol>
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