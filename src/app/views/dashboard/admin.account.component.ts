import { Component, OnInit } from '@angular/core';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import {IOption} from 'ng-select';

@Component({
  templateUrl: 'admin.account.component.html'
})
export class AdminAccountManageComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false
  company_data: any

  // ng2-select
  public countries: Array<IOption> = []
  dining_style: String[]
  router_info: any
  constructor(private route: ActivatedRoute,
    public dinnerbellservice: DinnerbellService, public router: Router, public authservice: AuthService) {
      this.route.params.subscribe(params => {
        this.router_info = params
      });
  }
  ngOnInit() {
    const params = {
      company_id : this.authservice.current_user.company_id
    }
    this.dinnerbellservice.getCompanyInfo(params).subscribe((res) => {
      this.company_data = res.data.company_data
    })
    this.dining_style = this.dinnerbellservice.dining_style
    this.dinnerbellservice.getCountries().subscribe((res) => {
      this.countries = res
      this.countries.forEach(element => {
        element.value = element.label
      });
    })
  }

  onDiningStyleChange(style) {
    this.company_data.dining_style = style
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  onSaveCompanyProfileInfo() {
    const params = {
      company_id : this.authservice.current_user.company_id,
      new_company_data: {
        company_profile: this.company_data.company_profile
      }
    }
    this.dinnerbellservice.saveCompanyInfo(params).subscribe((res) => {
      if (res.success) {
        alert('Successfully saved!')
      }
    })
  }
  expanded(event: any): void {
    // console.log(event);
  }
}
