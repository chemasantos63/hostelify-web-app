import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiPath } from '../shared/endpoints';

export interface User {
  firtsname: string;
  lastname: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserTokentSubject: BehaviorSubject<string>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      // @ts-ignore
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserTokentSubject = new BehaviorSubject<string>(
      this.currentUserValue ? this.currentUserValue.token : ``
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string {
    return this.currentUserTokentSubject.value;
  }

  async singin(username: string, password: string): Promise<any> {
    return await this.httpClient
      .post(`${environment.BASE_URI}/${ApiPath.Login}`, {
        username,
        password,
      })
      .pipe(
        map((response: any) => {
          const token = response.token;
          const user = jwtDecode(token) as User;
          user.token = token;
          localStorage.setItem(`currentUser`, JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.currentUserTokentSubject.next(token);
          return user;
        })
      )
      .toPromise();
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
    // @ts-ignore
    this.currentUserTokentSubject.next(null);
  }
}
