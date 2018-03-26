import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserManageComponent } from './super.user.component';
import { AdminAccountManageComponent } from './admin.account.component';
import { AdminStaffSettingComponent } from './admin.staff.component';
import { AdminMenuSettingComponent } from './admin.menu.component';
import { IngredientContainerComponent } from '../ingredient/ingredient.container.component';

const routes: Routes = [
  {
    path: 'super',
    children: [
      {
        path: 'usermanage',
        component: UserManageComponent,
        data: {
          title: 'User Management'
        }
      },
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'account_setting',
        component: AdminAccountManageComponent,
        data: {
          title: 'Account Setting'
        }
      },
      {
        path: 'menu_setting',
        component: AdminMenuSettingComponent,
        data: {
          title: 'Menu Setting'
        }
      },
      {
        path: 'staff_setting',
        component: AdminStaffSettingComponent,
        data: {
          title: 'Staff Dashboard'
        }
      },
      {
        path: 'ingredient',
        component: IngredientContainerComponent,
        data: {
          title: 'Ingredient Dashboard'
        }
      },
      {
        path: 'menu',
        component: IngredientContainerComponent,
        data: {
          title: 'Menu Dashboard'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
