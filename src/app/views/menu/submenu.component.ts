import { Component, OnInit, EventEmitter,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-submenu',
  templateUrl: 'submenu.component.html'
})
export class SubMenuComponent implements OnInit {
  @Input() subMenues: any[]
  @Input() mainMenues: any[]
  @Input() current_mainmenu_id: string
  @Input() viewMode: string
  newSubMenu: any
  newMenu: any
  company_id: string
  current_submenu_id: string
  labels: string[] = []
  uploadurl: String = `${environment.backend_base_url}/admin/user/uploadmenufile`
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.company_id = this.authservice.current_user.company_id
    this.newSubMenu = {
      name: '',
      company_id: this.company_id,
      menus: []
    }
    this.newMenu = {
      company_id: this.company_id,
      ingredients: [],
      custom_options: {},
      questions: [],
      details: {
        title: '',
        description: '',
        label: '',
        price: 0,
        photo_urls: []
      },
      categories: []
    }
    const params = {
      company_id: this.company_id
    }
    this.dinnerbellservice.getFoodLabels(params).subscribe((res) => {
      if (res.success) {
        this.labels = res.data.labels
      } else {
        this.labels = []
        alert(res.error.message)
      }
    })
  }
  onRegisterSubMenu(subMenuMDL) {
    if (this.newSubMenu.name.length === 0) {
      alert(`Name should'nt be empty`)
      return
    }
    if (!this.current_mainmenu_id) {
      alert('Please choose Main Menu')
      return
    }
    const params = {
      newSubMenu: this.newSubMenu,
      mainmenu_id: this.current_mainmenu_id
    }
    this.dinnerbellservice.registerSubMenu(params).subscribe((res) => {
      if (res.success) {
        this.subMenues.push(res.data.newSubMenu)
        this.newSubMenu = {
          name: '',
          company_id: this.company_id,
          menus: []
        }
        alert('Successfully registered!')
        subMenuMDL.hide()
      } else {
        alert(res.error.message)
      }
    })
  }
  createMenu(menuMDL) {
    this.newMenu = {
      company_id: this.company_id,
      ingredients: [],
      custom_options: {},
      questions: [],
      details: {
        title: '',
        description: '',
        label: '',
        price: 0,
        photo_urls: []
      },
      categories: []
    }
    menuMDL.show()
  }
  onAddCategoryToMenu() {
    const newCategoryRelation = {
      mainmenu: '',
      submenu: ''
    }
    this.newMenu.categories.push(newCategoryRelation);
  }
  subMenuOfMainMenu(mainmenu) {
    if (mainmenu.length < 1) {
      return []
    }
    for (let i = 0; i < this.mainMenues.length; i ++ ) {
      if (this.mainMenues[i]._id === mainmenu) {
        return this.ofCurrentSubMenu(this.mainMenues[i].submenus)
      }
    }
    return []
  }
  onRemoveCategoryFromMenu(idofrelation) {
    if (confirm('Are you sure?')) {
      this.newMenu.categories.splice(idofrelation, 1)
    }
  }
  // get submenus that exist in current submenus only
  ofCurrentSubMenu(submenu_ids) {
    const validSubmenus = []
    for (let i = 0; i < submenu_ids.length; i ++ ) {
      for (let k = 0; k < this.subMenues.length; k ++ ) {
        if (submenu_ids[i] === this.subMenues[k]._id) {
          validSubmenus.push(this.subMenues[k])
          break
        }
      }
    }
    return validSubmenus
  }
  onUploadFinished(event) {

    console.log(event)
    const result = JSON.parse(event.serverResponse._body)
    // this.newingredient.photo_url = result.fileName
  }
  onRemoved(event) {
    console.log(event)
    // this.newingredient.photo_url = ''
  }
  // getSubMenuName(submenu_id) {
  //   for (let i = 0; i < this.subMenues.length; i ++ ) {
  //     if (this.subMenues[i]._id === submenu_id) {
  //       console.log(submenu_id)
  //       return this.subMenues[i].name
  //     }
  //   }
  //   return ''
  // }
}
