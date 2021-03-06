import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CompanyComponent } from './company.component';
import { PasswordRecoverComponent } from './password.recover.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

// Angular 2 Input Mask
import { TextMaskModule } from 'angular2-text-mask';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// Ng2-select
import { SelectModule } from 'ng-select';
@NgModule({
  imports: [ FormsModule, CommonModule, AuthRoutingModule, TextMaskModule, SelectModule, TooltipModule.forRoot() ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CompanyComponent,
    PasswordRecoverComponent,
  ]
})
export class AuthModule { }
