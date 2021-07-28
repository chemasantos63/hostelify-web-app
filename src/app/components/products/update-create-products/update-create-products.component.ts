import { ProductsService } from './../../../services/products.service';
import { Product } from './../products.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from './../../../services/customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-update-create-products',
  templateUrl: './update-create-products.component.html',
  styleUrls: ['./update-create-products.component.sass'],
})
export class UpdateCreateProductsComponent implements OnInit {
  // @ts-ignore
  @ViewChildren(MatFormField) formFields: QueryList<MatFormField>;

  createUpdateProductForm: FormGroup;
  creatingProduct = true;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private dialogRef: MatDialogRef<UpdateCreateProductsComponent>
  ) {
    this.createUpdateProductForm = this.formBuilder.group({
      description: data ? data.product.description : '',
      code: data ? data.product.code : '',
      price: data ? data.product.price : '',
      stock: data ? data.product.stock : '',
      status: data ? data.product.status : '',
    });

    if (data) {
      this.creatingProduct = false;
    }
  }
  async handleSubmit() {
    try {
      if (this.creatingProduct) {
        await this.productsService.createProduct(this.createUpdateProductForm.value);
      } else {
        await this.productsService.updateProductById(
          this.data.product.id,
          this.createUpdateProductForm.value
        );
      }

      this.closeDialog(true);
    } catch (e) {
      this.closeDialog(false);
    }
  }
  ngOnInit(): void {}

  closeDialog(success?:boolean): void {
    this.dialogRef.close(success);
  }
}
