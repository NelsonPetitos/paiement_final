import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile.component';
import { ProfileDetailsComponent } from './components/profile-details.component';
import { ChangePwdComponent } from './components/change-pwd.component';
import { ManageAccountComponent } from './components/manage-account.component';
import { ManageAdressComponent } from './components/manage-adress.component';

const usersRoutes: Routes  = [
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: '',
                component : ProfileDetailsComponent,
            },
            {
                path: 'change-pwd',
                component: ChangePwdComponent
            },
            {
                path: 'manage-adress',
                component: ManageAdressComponent
            },
            {
                path: 'manage-account',
                component: ManageAccountComponent
            }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule {}