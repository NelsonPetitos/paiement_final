import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile.component';
import { ProfileDetailsComponent } from './components/profile-details.component';
import { ChangePwdComponent } from './components/change-pwd.component';
import { ManageAccountComponent } from './components/manage-account.component';
import { ManageAdressComponent } from './components/manage-adress.component';
import { ManageCashiersComponent } from './components/manage-cashiers.component';
import { PaymentsComponent } from './components/payments.component';
import { LogsComponent } from './components/logs.component';
import { ClientsComponent } from './components/clients.component';

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
                path: 'manage-cashiers',
                component: ManageCashiersComponent
            },
            {
                path: 'manage-adress',
                component: ManageAdressComponent
            },
            {
                path: 'manage-account',
                component: ManageAccountComponent
            },
            {
                path: 'payments',
                component: PaymentsComponent
            },
            {
                path: 'logs',
                component: LogsComponent
            },
            {
                path: 'clients',
                component: ClientsComponent
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