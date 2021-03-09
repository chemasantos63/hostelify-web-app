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

export interface customerTable {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: customerTable[] = [

];
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass'],
})
export class CustomerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      width: '250px',
     
    });

   
  }
  
  ngOnInit(): void {}
}
