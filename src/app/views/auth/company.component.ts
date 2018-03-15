import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {IOption} from 'ng-select';
@Component({
  templateUrl: 'company.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
  company_data: any
  router_info: any
  admin_roles: any
  dining_style: String[]
  message: String = ''
  public phoneModel = '';

  // ng2-select
  public countries: Array<IOption> = []
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
        country: this.router_info.country_label,
        city: '',
        state_province_region: '',
        street_address: '',
        zip_code: '',
        country_code: this.router_info.country_code,
        phone_number: this.router_info.phone_number,
        phone: '',
        website_address: ''
      },
      options: {
        digital_menu: false,
        graphic_design: false,
        branding: false,
        marketing: false,
        photo_video: false,
        web: false
      }
    }
    this.dinnerbellservice.getCountries().subscribe((res) => {
      this.countries = res
      this.countries.forEach(element => {
        element.value = element.label
      });
    })
    this.phoneModel = this.router_info.phone_number
    if (!this.router_info.user_id || !this.router_info.country_label) {
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };
      const redirect = '/auth/login'
      this.router.navigate([redirect], navigationExtras);
    }
  }
  onDiningStyleChange(style) {
    this.company_data.dining_style = style
  }
  submitCompanyProfile() {
    // Redirect the user
    if (this.validateForm()) {
      this.message = 'Submitting...'
      this.company_data.contact_information.phone = `+${this.router_info.country_code} (${this.router_info.phone_number.slice(0, 3)}) `
      + `${this.router_info.phone_number.slice(3, 6)}`
      + `-${this.router_info.phone_number.slice(6)}`

      const params = {
        company_id: this.router_info.company_id,
        user_id: this.router_info.user_id,
        user_email: this.router_info.user_email,
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
  validateForm() {
    const company_site = this.company_data.contact_information.website_address
    if (company_site.length > 0 && !this.validURL(company_site)) {
      this.message = 'Invalid site url'
      return false
    }
    if (this.company_data.name.length < 4) {
      this.message = 'Company name should be at least 4 letters'
      return false
    }
    if (this.company_data.cuisines.length < 1) {
      this.message = 'Please enter cuisines'
      return false
    }
    if (this.company_data.contact_person.fullname.length < 1) {
      this.message = 'Please enter contact full name'
      return false
    }
    if (this.company_data.contact_person.title.length < 1) {
      this.message = 'Please enter contact title'
      return false
    }
    if (this.company_data.contact_information.country.length < 1) {
      this.message = 'Please select Country'
      return false
    }
    if (this.company_data.contact_information.city.length < 1) {
      this.message = 'Please enter city name'
      return false
    }
    if (this.company_data.contact_information.state_province_region.length < 1) {
      this.message = 'Please enter state/province'
      return false
    }
    if (this.company_data.contact_information.street_address.length < 1) {
      this.message = 'Please enter street address'
      return false
    }
    if (this.company_data.contact_information.zip_code.length < 1) {
      this.message = 'Please enter zip code'
      return false
    }
    console.log(this.phoneModel)
    if (this.phoneModel.length < 8) {
      this.message = 'Please enter correct phone number'
      return false
    }
    return true
  }
  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
}
