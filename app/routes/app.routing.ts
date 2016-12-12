import { RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';

let appRoutes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
]

export const AppRouting = RouterModule.forRoot(appRoutes)