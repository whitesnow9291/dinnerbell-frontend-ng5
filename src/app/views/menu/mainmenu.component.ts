import { Component, OnInit, EventEmitter,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-mainmenu',
  templateUrl: 'mainmenu.component.html'
})
export class MainMenuComponent implements OnInit {
  newMainMenu: any
  company_id: any
  @Input() mainMenues: any[];
  @Output() mainMenuClick = new EventEmitter<boolean>();
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.company_id = this.authservice.current_user.company_id
    this.newMainMenu = {
      name: '',
      from_at: 8,
      to_at: 8,
      company_id: this.company_id,
      submenus: []
    }
  }
  onRegisterMainMenu(mainMenuMDL) {
    if (this.newMainMenu.name.length === 0) {
      alert(`Name should'nt be empty`)
      return
    }
    if (this.newMainMenu.from_at > this.newMainMenu.to_at) {
      alert('From time should be before than To time')
      return
    }
    const params = {
      newMainMenu: this.newMainMenu
    }
    this.dinnerbellservice.registerMainMenu(params).subscribe((res) => {
      if (res.success) {
        this.mainMenues.push(res.data.newMainMenu)
        this.newMainMenu = {
          name: '',
          from_at: 8,
          to_at: 8,
          company_id: this.company_id,
          submenus: []
        }
        alert('Successfully registered!')
        mainMenuMDL.hide()
      } else {
        alert(res.error.message)
      }
    })
  }
  onClickMainMenu(mM) {
    this.mainMenuClick.emit(mM)
  }
}
