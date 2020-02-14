import { Component, OnInit } from '@angular/core';
import { Analytics } from '../analytics/analytics';
import { OverviewService } from './overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [OverviewService],
})
export class OverviewComponent implements OnInit {
  analytics: number;
  error: string;
  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.getOverView();
  }

  getOverView(): void {
    console.log(this.error);
    this.overviewService.getOverView()
      .subscribe(analytics => (this.analytics = analytics.data),
        error => this.error = error.statusText);
  }
}
