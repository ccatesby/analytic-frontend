import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analytics } from './analytics';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class AnalyticService {
  analyticsUrl = 'api/views';  
  handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AnalyticsService');
  }

  getAnalytics (): Observable<Analytics[]> {
    return this.http.get<Analytics[]>(this.analyticsUrl)
  }
}
