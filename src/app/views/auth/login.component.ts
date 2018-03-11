import { Component, OnInit} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { DinnerbellService } from '../../services/dinnerbell.service'

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: any
  message: String
  admin_roles: any
  constructor(public router: Router, public authservice: AuthService, public dinnerbellservice: DinnerbellService) { }
  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    }
    this.admin_roles = this.dinnerbellservice.admin_roles
  }
  login() {
    const params = this.user
    this.authservice.login(params).subscribe((res) => {
      if (res.success) {
        // Redirect the user
        this.authservice.isLoggedIn = true
        this.authservice.current_user = res.data.user
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        let redirect = '/'
        if (this.authservice.current_user.role === 'super_visior') {
          redirect = '/dashboard/super/usermanage'
        } else {
          redirect = '/dashboard/admin/account_setting'
        }
        this.router.navigate([redirect], navigationExtras);
      } else {
        this.message = res.error.message
      }
    })
  }
}
