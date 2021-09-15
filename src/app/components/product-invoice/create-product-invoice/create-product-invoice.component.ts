import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer/customer.component';
import { Product } from '../../products/products.component';

@Component({
  selector: 'app-create-product-invoice',
  templateUrl: './create-product-invoice.component.html',
  styleUrls: ['./create-product-invoice.component.sass'],
})
export class CreateProductInvoiceComponent implements OnInit {
  // Form groups to use in stepper
  customerForm: FormGroup;

  // Datasources
  customers = new Array<Customer>();
  productsDataSource = new MatTableDataSource<Product>(new Array<Product>());

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      customerId: new FormControl(undefined, [Validators.required]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchCustomers();
  }

  async fetchCustomers(): Promise<void> {
    this.customers = await this.customerService.fetchAllCustomers();
  }

  public getErrorMessage(): string {
    if (this.customerForm.controls.customerId.hasError('required')) {
      return 'Por favor seleccione un cliente';
    }

    return '';
  }
}
