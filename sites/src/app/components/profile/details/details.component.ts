import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/details.component.html'
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