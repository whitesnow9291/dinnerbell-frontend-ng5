import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  public myModal;
  password: String = ''
  password_conf: String
  message: String
  @ViewChild('myModal') myModalEref: ElementRef;
  constructor(public router: Router, public authservice: AuthService) { }
  logout() {
    this.authservice.logout()
    this.router.navigate(['auth/login'])
  }
  changePassword(model_ref) {
    if (this.password !== this.password_conf) {
      this.message = 'Password not matched'
      return
    }
    if (this.checkPasswordStrenth(this.password)) {
      const params = {
        user_id: this.authservice.current_user._id,
        password: this.password
      }
      this.authservice.changePassword(params).subscribe((res) => {
        if (res.success) {
          alert('Successfully updated');
          model_ref.hide()
        } else {
          this.message = res.error.message
        }
      })
    }
  }
  checkPasswordStrenth (password) {
    if (password.length < 6) {
      this.message = 'Password must be at least 6 letters'
      return false
    }
    let hasCapital = false, hasSpecial = false, hasNumber = false
    for (let i = 0; i < password.length; i++) {
      const letter = password.charAt(i);
      if (letter >= 'A' && letter <= 'Z') {
        hasCapital = true
      }
      if (letter >= '0' && letter <= '9') {
        hasNumber = true
      }
    }
    if(/^[a-zA-Z0-9- ]*$/.test(password) === false) {
      hasSpecial = true
    }
    if (!hasCapital) {
      this.message = 'Password must contain 1 capital character'
      return false
    }
    if (!hasNumber) {
      this.message = 'Password must contain 1 number character'
      return false
    }
    if (!hasSpecial) {
      this.message = 'Password must contain 1 special character'
      return false
    }
    this.message = ''
    return true
  }
}
