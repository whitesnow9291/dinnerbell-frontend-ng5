import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'list.component.html'
})
export class IngredientListComponent implements OnInit {
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
