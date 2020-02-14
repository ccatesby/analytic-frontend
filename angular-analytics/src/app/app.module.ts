import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AnalyticsComponent } from '../app/analytics/analytics.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { HttpErrorHandler }     from './http-error-handler.service';
import { AuthInterceptor } from '../app/interceptors/auth.interceptors';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalyticsComponent,
    LoginComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
