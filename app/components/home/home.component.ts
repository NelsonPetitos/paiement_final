/**
 * Created by ndenelson on 01/12/2016.
 */
import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.template.html'
})
export class HomeComponent {
    constructor(private auth: Auth){}
}
