import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './components/profile.component';
import { DetailsComponent } from './components/details.component';

@NgModule({
    imports: [CommonModule, ProfileRoutingModule],
    declarations : [ProfileComponent, DetailsComponent],
    providers: []
})

export class ProfileModule {

}