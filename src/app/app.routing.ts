import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { FormsComponent } from './forms/forms.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forms', component: FormsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'invoice', component: InvoiceComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);