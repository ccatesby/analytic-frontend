import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-analytics';
  isLoggedIn$: Observable<boolean>;
  
  constructor(public authService: AuthService) { }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn;
  }
}
