import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../customer.component';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.sass'],
})
export class CreateUpdateComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChildren(MatFormField) formFields: QueryList<MatFormField>;

  createUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer }
  ) {
    this.createUpdateForm = this.formBuilder.group({
      name: data ? data.customer.name : '',
      lastNames: data ? data.customer.lastname : '',
      documentNumber: data ? data.customer.documentNumber : '',
      phone: data ? data.customer.phone : '',
      email: data ? data.customer.email : '',
      type: data ? `${data.customer.type.id}` : '',
    });

    if (data) {
      console.log(`Estan en modo editar cliente: `, data.customer);
    }
  }
  async handleSubmit() {
    // await this.customerService.createCustomer(
    //   this.createUpdateForm.value.name,
    //   this.createUpdateForm.value.lastNames,
    //   this.createUpdateForm.value.documentNumber,
    //   this.createUpdateForm.value.phone,
    //   this.createUpdateForm.value.email,
    //   this.createUpdateForm.value.type
    // );
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(
      () => this.formFields.forEach((ff) => ff.updateOutlineGap()),
      100
    );
  }
}
