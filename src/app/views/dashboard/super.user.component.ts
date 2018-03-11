import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { DinnerbellService } from '../../services/dinnerbell.service'

@Component({
  templateUrl: 'super.user.component.html'
})
export class UserManageComponent implements OnInit {

  userdata: any
  admin_roles: any
  constructor( public dinnerbellservice: DinnerbellService, public authservice: AuthService ) { }
  ngOnInit() {
    this.userdata = []
    this.dinnerbellservice.loadAllUsers({}).subscribe((res) => {
      if (res.success) {
        this.userdata = res.data.user
      }
    })
    this.admin_roles = this.dinnerbellservice.admin_roles
  }
  roleTitle(role) {
    for (let i = 0; i < this.admin_roles.length; i++) {
      const rolewithtitle = this.admin_roles[i]
      if (rolewithtitle.id === role) {
        return rolewithtitle.name
      }
    }
  }
  onChangeStatus(status, user_id) {
    const params = {
      user_id: user_id,
      status: ''
    }
    if (status) {
      params.status = 'approved'
    } else {
      params.status = 'notapproved'
    }
    this.dinnerbellservice.changeUserStatus(params).subscribe((res) => {
      if (res.success) {
        alert('succesfully updated')
      } else {
        alert('error')
      }
    })
  }
}
