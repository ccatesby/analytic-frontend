import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

import { Analytics } from './analytics';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable()
export class AnalyticService {
  analyticsUrl = 'api/views';  
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AnalyticsService');
  }


  /** GET heroes from the server */
  getAnalytics (): Observable<Analytics[]> {
    return this.http.get<Analytics[]>(this.analyticsUrl)
  }
}
