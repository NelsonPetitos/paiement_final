import { Component } from '@angular/core';
import { AuthWRT } from '../../services/my-auth.service';
import {PageScrollConfig} from 'ng2-page-scroll';

@Component({
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private auth: AuthWRT){
        PageScrollConfig.defaultScrollOffset = 50;
    }
}