import { CustomerService } from './../../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass'],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.formBuilder.group({
      names: '',
      lastNames: '',
      documentNumber: '',
      phone: -1,
      email: '',
      type: -1,
    });
  }
  async handleSubmit() {
    await this.customerService.createCustomer(
      this.customerForm.value.name,
      this.customerForm.value.lastNames,
      this.customerForm.value.documentNumber,
      this.customerForm.value.phone,
      this.customerForm.value.email,
      this.customerForm.value.type
    );
  }
  ngOnInit(): void {}
}
