import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.sass'],
})
export class DashboardCardComponent implements OnInit {
  // @ts-ignore
  @Input() imgSrc: string;
  // @ts-ignore
  @Input() description: string;
  // @ts-ignore
  @Input() quantity: string;

  constructor() {}

  ngOnInit(): void {}
}
