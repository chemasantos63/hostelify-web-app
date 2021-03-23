import { ToastrService } from 'ngx-toastr';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { CustomerService } from './../../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
export interface Type {
  id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Customer {
  id: number;
  name: string;
  lastname: string;
  documentNumber: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  type: Type;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass'],
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'lastname',
    'documentNumber',
    'email',
    'phone',
    'actions',
  ];

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private readonly customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateUpdateComponent)
      .afterClosed()
      .toPromise();

      await this.refreshDataSource(dialogRef);
      this.showSuccessToast(dialogRef);
  }

  private async refreshDataSource(dialogRef: any){
    if (dialogRef){
    this.dataSource = new MatTableDataSource(
      await this.customerService.fetchAllCustomers()
    );
    }
  }

  async ngOnInit(): Promise<void> {
    const customersDataSource = await this.customerService.fetchAllCustomers();

    this.dataSource = new MatTableDataSource(customersDataSource);
  }

  async handleEditClick(customer: Customer): Promise<void> {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        customer,
      },
    });
  }

  async handleDeleteClick(customer: Customer): Promise<void> {
    const result = await this.customerService.deleteCustomerById(customer.id);
    if (result) {
      alert(`Se borro el cliente exitosamente`);
    }
  }

  private showSuccessToast(dialogRef: any){
    if(dialogRef) {
      this.toastr.success('Cliente Creado','Operacion Exitosa');
    }
  }
}
