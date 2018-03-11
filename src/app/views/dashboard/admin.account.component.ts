import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'admin.account.component.html'
})
export class AdminAccountManageComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false

  constructor( ) { }
  ngOnInit() {

  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
}
