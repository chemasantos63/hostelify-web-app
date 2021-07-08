import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from './../../services/balance.service';
import { CreateBalanceModalService } from './../../services/create-balance-modal.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
})
export class SidenavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isUserLogin = false;
  constructor(
    private authService: AuthService,
    private createBalanceModalService: CreateBalanceModalService,
    private balanceService: BalanceService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.isUserLogin = this.authService.currentUserValue ? true : false;

    this.authService.currentUser.subscribe(async (user) => {
      this.isUserLogin = user ? true : false;
      if (!this.isUserLogin) {
        this.router.navigate(['/login']);
      } else {
        // TODO:buscar una mejor forma de hacer esto
        const balanceByUser = await this.balanceService.fetchBalancesByUser();

        console.log(balanceByUser);

        const sortBalanceByCreatedAtDate = balanceByUser.sort(
          // @ts-ignore
          (a, b) => b.createdAt - a.createdAt
        );

        const lastBalance = sortBalanceByCreatedAtDate[0];

        if (
          lastBalance.createdAt.setHours(0, 0, 0, 0) !==
          new Date().setHours(0, 0, 0, 0)
        ) {
          const createBalanceModalResult =
            await this.createBalanceModalService.show(lastBalance);
          console.log(createBalanceModalResult);
        }
      }
    });
  }

  handleLogoutClick(): void {
    this.authService.logout();
  }
}
