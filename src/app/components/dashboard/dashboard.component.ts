import { AuthService, User } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService) {
    //@ts-ignore
    this.username = this.authService.currentUserValue.username;
  }

  ngOnInit(): void {}
}
