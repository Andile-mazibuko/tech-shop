import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { AccountComponent } from './components/account/account.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CategorisedProductsComponent } from './components/categorised-products/categorised-products.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { authGuard } from './guards/auth.guard';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: ListProductsComponent },
      {
        path: 'category/:categoryName',
        component: CategorisedProductsComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: StatsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'orders', component: ListOrdersComponent },
    ],
    canActivate: [adminAuthGuard, authGuard],
  },

  { path: 'main', component: MainComponent },
  { path: 'account', component: AccountComponent },
];
