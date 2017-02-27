import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './components/details.component';
import { ProfileComponent } from './components/profile.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: '',
                component : DetailsComponent,
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}