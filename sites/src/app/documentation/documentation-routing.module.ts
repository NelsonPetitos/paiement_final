import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './components/home.component';
// import { PageNotFoundComponent } from './components/pagenotfound.component';

const docRoutes: Routes = [
    // {
    //     path: 'home',
    //     component: HomeComponent
    // },
    // { 
    //     path: '',
    //     redirectTo: '/home',
    //     pathMatch: 'full'
    // },
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
]

@NgModule({
    imports : [ RouterModule.forChild(docRoutes) ],
    exports : [ RouterModule ]
})
export class DocumentationRoutingModule {}