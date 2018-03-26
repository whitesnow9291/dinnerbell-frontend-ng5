import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserManageComponent } from './super.user.component';
import { AdminAccountManageComponent } from './admin.account.component';
import { AdminStaffSettingComponent } from './admin.staff.component';
import { AdminMenuSettingComponent } from './admin.menu.component';
import { IngredientContainerComponent } from '../ingredient/ingredient.container.component';
import { IngredientCategoryComponent } from '../ingredient/category.component';
import { IngredientHeaderComponent } from '../ingredient/header.component';
import { IngredientListComponent } from '../ingredient/list.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Ng2-select
import { SelectModule } from 'ng-select';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule,
    SelectModule,
    ModalModule.forRoot(),
  ],
  declarations: [ DashboardComponent,
     UserManageComponent,
     AdminAccountManageComponent,
     AdminStaffSettingComponent,
     AdminMenuSettingComponent,
     IngredientContainerComponent,
     IngredientCategoryComponent,
     IngredientHeaderComponent,
     IngredientListComponent]
})
export class DashboardModule { }
