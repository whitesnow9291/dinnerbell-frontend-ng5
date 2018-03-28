import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment';
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
  @Input() ingredients: any = []
  @Input() viewMode: string
  @Input() category_id: any

  public ingredientcount: number [] = []
  newingredient: any
  labels: any
  company_id: string
  uploadurl: String = `${environment.backend_base_url}/admin/user/uploadingredientfile`
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.newingredient = {
      title: '',
      price: '',
      photo_url: '',
      label: '',
      company_id: this.company_id,
    }
    this.company_id = this.authservice.current_user.company_id
    const params = {
      company_id: this.company_id
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
  onUploadFinished(event) {
    const result = JSON.parse(event.serverResponse._body)
    this.newingredient.photo_url = result.fileName
  }
  onRemoved(event) {
    console.log(event)
    this.newingredient.photo_url = ''
  }
  expanded(event: any): void {
    // console.log(event);
  }
  onRegisterIngredient(modal) {

    this.newingredient.category_id = this.category_id
    if (this.newingredient.title.trim().length === 0) {
      alert('Please insert title')
      return
    }
    if (this.newingredient.price.trim().length === 0) {
      alert('Please insert price')
      return
    }
    if (this.newingredient.label.trim().length === 0) {
      alert('Please insert label')
      return
    }
    if (!this.newingredient.category_id) {
      alert('Please choose category')
      return
    }
    const params = {
      newingredient: this.newingredient
    }
    this.dinnerbellservice.registerIngredient(params).subscribe((res) => {
      if (res.success) {
        alert('Successfully registered')
        modal.hide()
        this.ingredients.push(res.data.newIngredient)
        this.newingredient = {
          title: '',
          price: '',
          photo_url: '',
          label: '',
          company_id: this.company_id,
        }
      } else {
        alert(res.error.message)
      }
    })
  }
}
