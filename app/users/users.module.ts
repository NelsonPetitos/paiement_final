import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { Auth } from '../services/auth.service';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './components/profile.component';
import { ProfileDetailsComponent } from './components/profile-details.component';
import { ChangePwdComponent } from './components/change-pwd.component';
import { ManageAdressComponent } from './components/manage-adress.component';
import { ManageAccountComponent } from './components/manage-account.component';
import { CircleLoaderComponent } from '../loaders/circle-loader.component';
import { BarLoaderComponent } from '../loaders/bar-loader.component';

@NgModule({
    imports: [
        UsersRoutingModule,
        HttpModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        ProfileComponent,
        ProfileDetailsComponent,
        ChangePwdComponent,
        ManageAccountComponent,
        ManageAdressComponent,
        CircleLoaderComponent,
        BarLoaderComponent
    ],
    providers: [
        UsersService,
        Auth
    ]
})
export class UsersModule {}