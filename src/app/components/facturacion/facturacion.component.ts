import { Customer } from './../customer/customer.component';
import { Component, OnInit } from '@angular/core';
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
  discuuntPercent: number;
  condition: string;
  paymentTermId: number;
  paymentTypeId: number; 
}

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.sass']
})

export class FacturacionComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
   
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
