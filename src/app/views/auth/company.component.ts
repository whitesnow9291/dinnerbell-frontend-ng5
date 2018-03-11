import { Component, OnInit } from '@angular/core';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  templateUrl: 'company.component.html'
})
export class CompanyComponent implements OnInit {
  company_data: any
  router_info: any
  admin_roles: any
  dining_style: String[]
  message: String = ''
  constructor(private route: ActivatedRoute,
    public dinnerbellservice: DinnerbellService, public router: Router) {
      this.route.params.subscribe(params => {
        this.router_info = params
      });
  }
  ngOnInit() {
    this.dining_style = this.dinnerbellservice.dining_style
    this.company_data = {
      name: '',
      dining_style: this.dining_style[0],
      cuisines: '',
      contact_person: {
        fullname: '',
        title: ''
      },
      contact_information: {
        country: '',
        city: '',
        state_province_region: '',
        street_address: '',
        zip_code: '',
        phone_number: '',
        website_address: ''
      }
    }
  }
  onDiningStyleChange(style) {
    this.company_data.dining_style = style
  }
  submitCompanyProfile() {
    // Redirect the user
    const params = {
      company_id: this.router_info.company_id,
      company_data: this.company_data
    }
    this.dinnerbellservice.registerCompany(params).subscribe((res) => {
      if (res.success) {
        alert('succesfully registered')
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        const redirect = '/auth/login'
        this.router.navigate([redirect], navigationExtras);
      } else {
        this.message = res.error.message
      }
    })

  }
}
