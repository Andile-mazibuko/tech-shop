import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { AccountComponent } from './components/account/account.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: StatsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'account', component: AccountComponent }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'account', component: AccountComponent },
];
