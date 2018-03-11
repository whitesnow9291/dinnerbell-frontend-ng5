import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
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
class Group {
  id: String;
  title: String;
}
@Injectable()
export class DinnerbellService {
  postUrl = 'https://vast-taiga-29858.herokuapp.com';
  // postUrl = 'http://localhost:3000';

  admin_roles = [{
    'id' : 'restaurant_manager',
    'name' : 'Restaurant Manager'
  }, {
    'id' : 'super_visior',
    'name' : 'Super Visior'
  }]
  user_roles = ['host', 'server', 'staff']
  dining_style = ['Café / Bistro', 'Fast food', 'Fast casual', 'Casual dining', 'Fine dining', 'Other']

  constructor(
    private http: HttpClient) {
  }

  registerCompany(params): Observable<any> {
    const registerUrl = `${this.postUrl}/admin/auth/register_company`
    return this.http.post<any>(registerUrl, params, httpOptions)
  }
  loadAllUsers(params): Observable<any> {
    const loadUrl = `${this.postUrl}/admin/user/load_all_user`
    return this.http.post<any>(loadUrl, params, httpOptions)
  }
  changeUserStatus(params): Observable<any> {
    const approveUrl = `${this.postUrl}/admin/user/change_user_status`
    return this.http.post<any>(approveUrl, params, httpOptions)
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
