import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
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

  postUrl = environment.backend_base_url;

  admin_roles = [{
    'id' : 'restaurant_manager',
    'name' : 'Restaurant Manager'
  }, {
    'id' : 'super_visior',
    'name' : 'Super Visior'
  }]
  employee_roles = ['Host', 'Server', 'Chef']
  dining_style = ['Café / Bistro', 'Fast food', 'Fast casual', 'Casual dining', 'Fine dining', 'Other']

  constructor(
    private http: HttpClient) {
  }

  getCountries(): Observable<any> {
    const registerUrl = './assets/countries.json'
    return this.http.get<any>(registerUrl, httpOptions)
  }
  registerCompany(params): Observable<any> {
    const registerUrl = `${this.postUrl}/admin/auth/register_company`
    return this.http.post<any>(registerUrl, params, httpOptions)
  }
  loadAllUsers(params): Observable<any> {
    const loadUrl = `${this.postUrl}/admin/user/load_all_user`
    return this.http.post<any>(loadUrl, params, httpOptions)
  }
  loadEmployees(params): Observable<any> {
    const loadUrl = `${this.postUrl}/admin/user/load_employees`
    return this.http.post<any>(loadUrl, params, httpOptions)
  }
  updateEmployee(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/update_employee`
    return this.http.post<any>(url, params, httpOptions)
  }
  removeEmployee(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/remove_employee`
    return this.http.post<any>(url, params, httpOptions)
  }
  changeUserStatus(params): Observable<any> {
    const approveUrl = `${this.postUrl}/admin/user/change_user_status`
    return this.http.post<any>(approveUrl, params, httpOptions)
  }
  getCompanyInfo(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getCompanyInfo`
    return this.http.post<any>(url, params, httpOptions)
  }
  saveCompanyInfo(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/saveCompanyInfo`
    return this.http.post<any>(url, params, httpOptions)
  }
  // ingredient menu
  getIngredientCategory(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getIngredientCategory`
    return this.http.post<any>(url, params, httpOptions)
  }
  getIngredients(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getIngredients`
    return this.http.post<any>(url, params, httpOptions)
  }
  registerIngredientCategory(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/registerIngredientCategory`
    return this.http.post<any>(url, params, httpOptions)
  }
  registerIngredient(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/registerIngredient`
    return this.http.post<any>(url, params, httpOptions)
  }
  getIngredientLabels(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getIngredientLabels`
    return this.http.post<any>(url, params, httpOptions)
  }
  getFoodLabels(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getIngredientLabels`
    return this.http.post<any>(url, params, httpOptions)
  }
  // menu
  getMainMenu(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getMainMenu`
    return this.http.post<any>(url, params, httpOptions)
  }
  getSubMenus(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getSubMenus`
    return this.http.post<any>(url, params, httpOptions)
  }
  registerMainMenu(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/registerMainMenu`
    return this.http.post<any>(url, params, httpOptions)
  }
  registerSubMenu(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/registerSubMenu`
    return this.http.post<any>(url, params, httpOptions)
  }
  registerMenu(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/registerMenu`
    return this.http.post<any>(url, params, httpOptions)
  }
  getMenuLabels(params): Observable<any> {
    const url = `${this.postUrl}/admin/user/getMenuLabels`
    return this.http.post<any>(url, params, httpOptions)
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
