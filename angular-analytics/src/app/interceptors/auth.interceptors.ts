import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken;

    if (authToken) {
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    }

    return next.handle(req);
  }
}
