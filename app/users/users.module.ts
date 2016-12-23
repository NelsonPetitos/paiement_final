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
import { AddAdressComponent } from './components/add-adress.component';
import { ManageAccountComponent } from './components/manage-account.component';
import { LoaderComponent } from '../loader.component';

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
        AddAdressComponent,
        LoaderComponent
    ],
    providers: [
        UsersService,
        Auth
    ]
})
export class UsersModule {}