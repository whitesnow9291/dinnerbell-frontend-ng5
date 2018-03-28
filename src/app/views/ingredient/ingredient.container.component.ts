import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'

@Component({
  templateUrl: 'ingredient.container.component.html'
})
export class IngredientContainerComponent implements OnInit {

  viewMode: String = 'list'
  ingredients: any = []
  company_id: string
  category_index: number
  category_id: String = ''
  categories: any[] = []
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.company_id = this.authservice.current_user.company_id
    this.category_index = -1

    const params_category = {
      company_id: this.company_id
    }
    this.dinnerbellservice.getIngredientCategory(params_category).subscribe((res) => {
      if (res.success) {
        this.categories = res.data.ingredient_categories
      } else {
        alert(res.error.message)
      }
    })
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  onCategoryChange($event) {
    this.category_index = $event
    this.category_id = this.categories[this.category_index]._id

    const params_ingredient = {
      category_id: this.category_id
    }
    this.dinnerbellservice.getIngredients(params_ingredient).subscribe((res) => {
      if (res.success) {
        this.ingredients = res.data.ingredients
      } else {
        alert(res.error.message)
      }
    })
  }
  onViewModeChange($event) {
    this.viewMode = $event
  }
  expanded(event: any): void {
    // console.log(event);
  }
}
