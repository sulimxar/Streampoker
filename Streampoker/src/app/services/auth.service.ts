import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  private storageAccessTokenName = 'access_token';
  currentUser: any;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.storageAccessTokenName);
    if (token) {
      this.currentUser = this.jwtHelperService.decodeToken(token);
    }
  }

  login(credentials) {

    // const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlZpdGFsaWkifQ.cK5mDqv2DCdx4QbGenGQJurQegpqQZw45M9Ahlf4prs';
    // localStorage.setItem(this.storageAccessTokenName, fakeToken);
    // this.currentUser = this.jwtHelperService.decodeToken(localStorage.getItem(this.storageAccessTokenName));

    return Observable.of<boolean>(false);

  //  return this.http.post('/api/authenticate', JSON.stringify(credentials))
  //   .map(response => {
  //     const result = response.json();

  //     if (result && result.token) {
  //       localStorage.setItem(this.storageAccessTokenName, result.token);

  //       this.currentUser = this.jwtHelperService.decodeToken(localStorage.getItem(this.storageAccessTokenName));

  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  }

  logout() {
    localStorage.removeItem(this.storageAccessTokenName);
    this.currentUser = null;
  }

  isLoggedIn(): boolean {

    const token: string = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

    return !tokenExpired;
  }
}

