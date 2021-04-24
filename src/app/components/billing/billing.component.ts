import { BillingService } from './../../services/billing.service';
import { Customer } from '../customer/customer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface InVoice{
  id: number;
  inVoiceNumber: number;
  createdDate: Date;
  expirationDate: Date;
  customer: Customer;
  emitionPointID: number;
  caiId: number;
  income: number;
  tax15: number;
  tax18: number;
  tourismTax: number;
  discount: number;
  discountPercent: number;
  condition: string;
  paymentTermId: number;
  paymentTypeId: number; 
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.sass']
})

export class BillingComponent implements OnInit {
   // @ts-ignore
  
 
  displayedColumns: string[] = [
    'inVoiceNumber',
    'customer',
    'createdDate',
    'expirationDate',
    'income',
    'condition',
  ];
 
  dataSource: MatTableDataSource<InVoice> = new MatTableDataSource();
    
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private readonly billingService: BillingService) { }

  async ngOnInit(): Promise<void> {
    const billingDataSource = await this.billingService.fetchAllBills();
    
    this.dataSource = new MatTableDataSource(billingDataSource);
    this.dataSource.paginator = this.paginator; 
  }


  async handleEditClick(inVoice: InVoice): Promise<void> {
  
  }

  async handleDeleteClick(inVoice: InVoice): Promise<void> {
   
  }

  async openDialog(): Promise<void> {
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
