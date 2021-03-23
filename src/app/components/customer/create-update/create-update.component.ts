import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  creatingCustomer = true;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private dialogRef: MatDialogRef<CreateUpdateComponent>
  ) {
    this.createUpdateForm = this.formBuilder.group({
      name: data ? data.customer.name : '',
      lastname: data ? data.customer.lastname : '',
      documentNumber: data ? data.customer.documentNumber : '',
      phone: data ? data.customer.phone : '',
      email: data ? data.customer.email : '',
      customerTypeId: data ? `${data.customer.type.id}` : '',
    });

    if (data) {
      this.creatingCustomer = false;
    }
  }
  async handleSubmit() {
    try {
      if (this.creatingCustomer) {
        await this.customerService.createCustomer(this.createUpdateForm.value);
      } else {
        await this.customerService.updateCustomerById(
          this.data.customer.id,
          this.createUpdateForm.value
        );
      }

      this.closeDialog(true);
    } catch (e) {
    this.closeDialog(false);
    }
    
    
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(
      () => this.formFields.forEach((ff) => ff.updateOutlineGap()),
      100
    );
  }

  closeDialog(success?: boolean):void {
    this.dialogRef.close(success);
  }
}
