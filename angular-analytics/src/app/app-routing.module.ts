import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { AnalyticsComponent } from './analytics/analytics.component'
import { OverviewComponent } from './overview/overview.component'

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'analytics/:path', component: AnalyticsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
