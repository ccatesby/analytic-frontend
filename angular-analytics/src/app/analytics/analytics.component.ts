import { Component, OnInit } from '@angular/core';
import { Analytics } from './analytics';
import { AnalyticService } from './analytics.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  providers: [AnalyticService],
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analytics: Analytics[];
  error: string;

  constructor(private analyticService: AnalyticService) {}

  ngOnInit() {
    this.getAnalytics();
  }

  getAnalytics(): void {
    this.analyticService.getAnalytics()
      .subscribe(analytics => (this.analytics = analytics),
        error => this.error = error.statusText);
  }
}