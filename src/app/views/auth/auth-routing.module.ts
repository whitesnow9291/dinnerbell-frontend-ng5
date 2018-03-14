import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CompanyComponent } from './company.component';
import { PasswordRecoverComponent } from './password.recover.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Auth Pages'
    },
    children: [
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'recover_password',
        component: PasswordRecoverComponent,
        data: {
          title: 'Recover Page'
        }
      },
      {
        path: '**',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
