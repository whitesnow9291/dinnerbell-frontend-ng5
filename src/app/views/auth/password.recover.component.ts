import { Component, OnInit} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { DinnerbellService } from '../../services/dinnerbell.service'

@Component({
  templateUrl: 'password.recover.component.html'
})
export class PasswordRecoverComponent implements OnInit {
  message: String
  emailOrCustomerID: String
  constructor(public router: Router, public authservice: AuthService, public dinnerbellservice: DinnerbellService) { }
  ngOnInit() {
    this.emailOrCustomerID = ''
  }
  sendPassword() {
    let params = {
    }
    if (this.emailOrCustomerID.length === 0) {
      this.message = 'Insert your email or customer ID.'
      return
    }
    if (this.validateEmail(this.emailOrCustomerID)) {
      params = {
        emailOrCustomerID: this.emailOrCustomerID,
        type: 'email'
      }
    } else {
      for (let i = 0; i < this.emailOrCustomerID.length; i++) {
        const charone = this.emailOrCustomerID.charAt(i)
        if (!(charone >= '0' && charone <= '9')) {
          this.message = 'Incorrect customer id type.'
          return
        }
      }
      if (this.emailOrCustomerID.length !== 6) {
        this.message = 'Customer id length should be 6.'
        return
      }
      params = {
        emailOrCustomerID: this.emailOrCustomerID,
        type: 'customer_id'
      }
    }
    this.message = ''
    this.authservice.sendPassword(params).subscribe((res) => {
      if (res.success) {
        // Redirect the user
        this.message = 'successfully sent, please check your email'
      } else {
        this.message = res.error.message
      }
    })
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
