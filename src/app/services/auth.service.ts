import { Injectable } from '@angular/core';

import { Observable, Subscribable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class AuthService {
  isLoggedIn = false;

  postUrl = 'https://vast-taiga-29858.herokuapp.com';
  // postUrl = 'http://localhost:3000';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  current_user: any;
  constructor(
    private http: HttpClient) {
  }
  register(params): Observable<any> {
    const registerUrl = `${this.postUrl}/admin/auth/signup`
    return this.http.post<any>(registerUrl, params, httpOptions)
  }
  sendAuthyToken(params): Observable<any> {
    const authtokenUrl = `${this.postUrl}/admin/auth/sendAuthyToken`
    return this.http.post<any>(authtokenUrl, params, httpOptions)
  }
  verifyAuthyToken(params): Observable<any> {
    const verifyAuthyTokenUrl = `${this.postUrl}/admin/auth/verifyAuthyToken`
    return this.http.post<any>(verifyAuthyTokenUrl, params, httpOptions)
  }
  login(params): Observable<any> {
    // return Observable.of(true).do(val => this.isLoggedIn = val)
    const loginUrl = `${this.postUrl}/admin/auth/signin`
    return this.http.post<any>(loginUrl, params, httpOptions)
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
