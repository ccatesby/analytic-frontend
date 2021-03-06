import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Analytics } from './analytics';
import { AnalyticService } from './analytics.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'; 
import * as moment from 'moment/moment';
@Component({

  encapsulation: ViewEncapsulation.None,
  templateUrl: './analytics.component.html',
  providers: [AnalyticService],
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements  OnInit  {
  @ViewChild('barchart') private chartContainer;

  @Input()
  data: Analytics = null;
  error: string;
  pathUrl: string;
  margin = {top: 20, right: 20, bottom: 60, left: 50};
  //TODO: get available page paths from api.
  availablePaths = ["home", "search", "details", "blog"];
  //TODO: find min startdate of result data set.
  startDate: number = 1580688000000;
  timeSince: string = null;

  setTimeSince(startDate: number) {
    this.timeSince = moment(startDate).fromNow();
  }

  constructor(private analyticService: AnalyticService, 
    private route:ActivatedRoute, 
    private location: Location) {}

  changePath(value: string) {
    this.pathUrl = value;
    this.location.replaceState(`/${value}`);
    this.getAnalytics(value, this.startDate);
  }

  changeStartDate(value) {
    var d = new Date(value);
    this.startDate = d.getTime();
    this.setTimeSince(this.startDate);
    this.getAnalytics(this.pathUrl, this.startDate);
  }

  ngOnInit() {
    this.setTimeSince(this.startDate);
    this.getAnalytics(this.route.snapshot.params['path'], this.startDate);
  }

  getAnalytics(pathUrl: string, startDate: number): void {
    this.analyticService.getAnalytics(pathUrl, startDate)
      .subscribe(analytics => { (this.data = analytics); this.createChart(); },
        error => this.error = error.statusText);
  }

  private createChart(): void {
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.countries.map(d => d._id));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data.countries, d => d.count)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em');

      g.append("text")             
      .attr("x", contentWidth /2 )
      .attr("y", contentHeight + 40)
        .text("Countries");

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left)
        .attr("x",0 - (contentHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("View Counts"); 

        g.selectAll('.bar')
        .data(data.countries)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d._id))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d.count));
  }
}