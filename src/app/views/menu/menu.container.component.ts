import { Component, OnInit, EventEmitter,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment';
@Component({
  templateUrl: 'menu.container.component.html'
})
export class MenuContainerComponent implements OnInit {

  company_id: string
  mainMenues: any[] = []
  subMenues: any[] = []
  current_mainmenu_id: string
  viewMode: String = 'list'
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.company_id = this.authservice.current_user.company_id

    const params = {
      company_id: this.company_id
    }
    this.dinnerbellservice.getMainMenu(params).subscribe((res) => {
      if (res.success) {
        this.mainMenues = res.data.mainMenues
      } else {
        alert(res.error.message)
      }
    })
  }
  mainMenuClick($event) {
    // load sub menues

    this.current_mainmenu_id = $event._id
    const params = {
      mainmenu_id: $event._id
    }
    this.dinnerbellservice.getSubMenus(params).subscribe((res) => {
      if (res.success) {
        this.subMenues = res.data.subMenues
      } else {
        alert(res.error.message)
      }
    })
  }
  onViewModeChange($event) {
    this.viewMode = $event
  }
}
