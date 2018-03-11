import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { UserManageComponent } from './super.user.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminAccountManageComponent } from './admin.account.component';
import { AdminStaffSettingComponent } from './admin.staff.component';
import { AdminMenuSettingComponent } from './admin.menu.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [ DashboardComponent,
     UserManageComponent,
     AdminAccountManageComponent,
     AdminStaffSettingComponent,
     AdminMenuSettingComponent]
})
export class DashboardModule { }
