import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';

const siteRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(siteRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SiteRoutingModule {}