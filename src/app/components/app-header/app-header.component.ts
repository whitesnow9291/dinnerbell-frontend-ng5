import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit{
  public myModal;
  password: String = ''
  password_conf: String
  message: String
  customer_id: String
  @ViewChild('myModal') myModalEref: ElementRef;
  constructor(public router: Router, public authservice: AuthService) { }
  ngOnInit () {
    this.customer_id = this.authservice.current_user.customer_id
  }
  logout() {
    this.authservice.logout()
    this.router.navigate(['auth/login'])
  }
}
