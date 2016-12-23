import { Component, OnInit } from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.template.html'
})

export class AppComponent { 
    private profile: any;

    constructor(private auth: Auth){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'))
    }
}
