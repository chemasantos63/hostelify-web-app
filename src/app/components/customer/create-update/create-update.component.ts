import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.sass']
})
export class CreateUpdateComponent implements OnInit {
    createUpdateForm: FormGroup;
    constructor(
      private formBuilder: FormBuilder,
      private customerService: CustomerService
    ) {
      this.createUpdateForm = this.formBuilder.group({
        name: '',
        lastNames: '',
        documentNumber: '',
        phone: -1,
        email: '',
        type: -1,
      });
    }
    async handleSubmit() {
      await this.customerService.createCustomer(
        this.createUpdateForm.value.name,
        this.createUpdateForm.value.lastNames,
        this.createUpdateForm.value.documentNumber,
        this.createUpdateForm.value.phone,
        this.createUpdateForm.value.email,
        this.createUpdateForm.value.type
      );
    }
    ngOnInit(): void {}
  
  

}
