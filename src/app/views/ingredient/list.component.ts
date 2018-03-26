import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-ingredient-list',
  templateUrl: 'list.component.html'
})
export class IngredientListComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false
  @Input() ingredients: number
  @Input() viewMode: string
  public ingredientcount: number [] = []
  newingredient: any
  labels: any
  company_id: string
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.newingredient = {
      title: '',
      price: '',
      photo_url: '',
      label: '',
      company_id: ''
    }
    this.company_id = this.authservice.current_user.company_id
    const params = {
      company_id: this.company_id,
    }
    this.dinnerbellservice.getIngredientLabels(params).subscribe((res) => {
      if (res.success) {
        this.labels = res.data.labels
      } else {
        this.labels = []
        alert(res.error.message)
      }
    })
  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  onRegisterIngredient(modal) {

  }
}
