import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from './token';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    private loginUrl = 'api/login';  
    private token = new BehaviorSubject <Token>(null);
    isLoggedIn = false;

    constructor(
        private http: HttpClient
    ) {}

    public get getAuthorizationToken(): string {
        return this.isLoggedIn ? this.token.value.token : null;
    }

    login() {
        return this.http.get<Token>(this.loginUrl).pipe(map(value => {
            this.token.next(value)
            this.isLoggedIn = true;
            return value.sucess;
        }))
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
