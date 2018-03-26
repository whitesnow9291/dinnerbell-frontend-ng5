import { Component, OnInit } from '@angular/core';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import {IOption} from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'admin.account.component.html'
})
export class AdminAccountManageComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = true
  employeeCollapsed: Boolean = true
  seatingCollapsed: Boolean = true
  stripeCollapsed: Boolean = true
  opentableCollapsed: Boolean = true

  company_data: any
  employees: any
  password: any
  employee_roles: any

  newEmployee: any
  employee_id_on_edit: number = -1
  // ng2-select
  public countries: Array<IOption> = []
  dining_style: String[]
  router_info: any
  company_id: string
  constructor(private route: ActivatedRoute,
    public dinnerbellservice: DinnerbellService, public router: Router, public authservice: AuthService) {
      this.route.params.subscribe(params => {
        this.router_info = params
      });
  }
  ngOnInit() {
    this.employee_roles = this.dinnerbellservice.employee_roles
    const params = {
      company_id : this.authservice.current_user.company_id
    }
    this.dinnerbellservice.getCompanyInfo(params).subscribe((res) => {
      this.company_data = res.data.company_data
    })
    this.dinnerbellservice.loadEmployees(params).subscribe((res) => {
      this.employees = res.data.employees
    })
    this.dining_style = this.dinnerbellservice.dining_style
    this.dinnerbellservice.getCountries().subscribe((res) => {
      this.countries = res
      this.countries.forEach(element => {
        element.value = element.label
      });
    })
    this.password = {
      old: '',
      new: '',
      confirm: ''
    }
    this.newEmployee = {
      name: '',
      role: 'Server'
    }
    this.company_id = this.authservice.current_user.company_id
  }
  // employee
  addNewEmployee(myModal) {
    this.employee_id_on_edit = -1
    this.newEmployee = {
      _id: '-1',
      name: '',
      role: 'Server'
    }
    myModal.show()
  }
  editEmployee(i, myModal) {
    this.employee_id_on_edit = i
    this.newEmployee = Object.assign({}, this.employees[i])
    myModal.show()
  }
  removeEmployee(i) {
    if (confirm('Are you sure?')) {
      const params = {
        employee_id: this.employees[i]._id
      }
      this.dinnerbellservice.removeEmployee(params).subscribe((res) => {
        if (res.success) {
          this.employees.splice(i, 1)
          alert('Employee removed successfully')
        } else {
          alert(res.error.message)
        }
      })
    }
  }
  saveEmployees(myModal) {
    const params = {
      employee: this.newEmployee,
      company_id: this.company_id
    }
    this.dinnerbellservice.updateEmployee(params).subscribe((res) => {
      myModal.hide()
      if (res.success) {
        if (this.employee_id_on_edit === -1) {
          this.employees.push(res.data.newemployee)
        } else {
          this.employees[this.employee_id_on_edit] = res.data.newemployee
        }
        alert('Employee updated successfully')
      } else {
        alert(res.error.message)
      }
    })
  }
  // -- employee
  changePassword() {
    if (this.password.new !== this.password.confirm) {
      alert('Password not matched')
      return
    }
    if (this.checkPasswordStrenth(this.password.new)) {
      const params = {
        user_id: this.authservice.current_user._id,
        password: this.password
      }
      this.authservice.changePassword(params).subscribe((res) => {
        if (res.success) {
          alert('Successfully updated');
        } else {
         alert(res.error.message)
        }
      })
    }
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

  checkPasswordStrenth (password) {
    if (password.length < 6) {
      alert('Password must be at least 6 letters')
      return false
    }
    let hasCapital = false, hasSpecial = false, hasNumber = false
    for (let i = 0; i < password.length; i++) {
      const letter = password.charAt(i);
      if (letter >= 'A' && letter <= 'Z') {
        hasCapital = true
      }
      if (letter >= '0' && letter <= '9') {
        hasNumber = true
      }
    }
    if(/^[a-zA-Z0-9- ]*$/.test(password) === false) {
      hasSpecial = true
    }
    if (!hasCapital) {
      alert('Password must contain 1 capital character')
      return false
    }
    if (!hasNumber) {
      alert('Password must contain 1 number character')
      return false
    }
    if (!hasSpecial) {
      alert('Password must contain 1 special character')
      return false
    }
    return true
  }
}
