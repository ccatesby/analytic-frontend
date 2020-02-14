import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AnalyticsComponent } from '../app/analytics/analytics.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { HttpErrorHandler }     from './http-error-handler.service';
import { AuthService } from '../app/login/auth.service';
import { AuthInterceptor } from '../app/interceptors/auth.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    AnalyticsComponent,
    LoginComponent,
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
