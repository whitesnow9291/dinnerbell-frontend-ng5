import { Component, OnInit, EventEmitter,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'


@Component({
  templateUrl: 'category.component.html',
  selector: 'app-ingredient-category',
})
export class IngredientCategoryComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false

  @Input() categories: any[];
  @Output() onClickCategoryEmit = new EventEmitter<boolean>();

  current_categry_index: number
  ingredientcategories: any[]
  newCategory: any
  company_id: string
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.current_categry_index = -1
    this.newCategory = {
      name: ''
    }
  }
  onRegisterCategory(modal) {
    if (this.newCategory.name.length === 0) {
      alert(`Category name should'nt be empty`)
      return
    }
    this.company_id = this.authservice.current_user.company_id
    const params = {
      company_id: this.company_id,
      ingredients: [],
      name: this.newCategory.name
    }
    this.dinnerbellservice.registerIngredientCategory(params).subscribe((res) => {
      if (res.success) {
        this.categories.push(res.data.newCategory)
        alert('Successfully registered!')
        modal.hide()
      } else {
        alert(res.error.message)
      }
    })
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  onClickCategory(index) {
    this.onClickCategoryEmit.emit(index);
    this.current_categry_index = index
  }
  expanded(event: any): void {
    // console.log(event);
  }
}
