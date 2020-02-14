import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService) {
    this.setMessage();
  }
  isLoggedIn$: Observable<boolean>;
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn;
  }

  setMessage() {
    this.message = 'You Are Logged ' + (this.isLoggedIn$ ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    
    this.authService.login().subscribe((calue) => {

      this.setMessage();

    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
