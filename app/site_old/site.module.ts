import { NgModule } from '@angular/core';
import { Ng2PageScrollModule }  from 'ng2-page-scroll/ng2-page-scroll';

import { SiteRoutingModule } from './site-routing.module';

import { HomeComponent } from './components/home.component';

@NgModule({
    imports: [
        SiteRoutingModule,
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        HomeComponent
    ]
})

export class SiteModule {}