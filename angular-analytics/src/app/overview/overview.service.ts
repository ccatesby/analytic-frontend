import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analytics } from '../analytics/analytics';

@Injectable()
export class OverviewService {
  analyticsUrl = 'api/views';  

  constructor(
    private http: HttpClient) {
  }

  getOverView (): Observable<Analytics> {
    return this.http.get<Analytics>(this.analyticsUrl)
  }
}
