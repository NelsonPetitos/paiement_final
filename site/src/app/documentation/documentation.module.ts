import { NgModule } from '@angular/core';

import { DocumentationRoutingModule } from './documentation-routing.module';

import { PageNotFoundComponent } from './components/pagenotfound.component';
import { HomeComponent } from './components/home.component';

@NgModule({
    imports: [ DocumentationRoutingModule],
    declarations: [ HomeComponent, PageNotFoundComponent]
})
export class DocumentationModule {

}