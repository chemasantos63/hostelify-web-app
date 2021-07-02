import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

  

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
})
export class SidenavbarComponent {
  showAdmin = false;
 
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isUserLogin = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    this.isUserLogin = this.authService.currentUserValue ? true : false;

    this.authService.currentUser.subscribe((user) => {
      this.isUserLogin = user ? true : false;
      if (!this.isUserLogin) {
        this.router.navigate(['/login']);
      }
    });
  }



  handleLogoutClick(): void {
    this.authService.logout();
  }
}
