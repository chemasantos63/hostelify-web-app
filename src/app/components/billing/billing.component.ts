import { BillingService } from './../../services/billing.service';
import { Customer } from '../customer/customer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Permanence } from '../permanence/permanence.component';

export interface Invoice {
  id: number;
  cai: string;
  invoiceNumber: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  permanences: Permanence[];
  total: Total;
  payments: Payment[];
  fiscalInformation: FiscalInformation;
}
export interface Total {
  tourismTax: string;
  exemptAmount: string;
  taxedAmount: string;
  tax18Amount: string;
  tax15Amount: string;
  total: string;
  subtotal: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface Payment {
  id: number;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  id: number;
  description: string;
  exchangeRate: string;
  symbol: string;
  status: string;
  isCash: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FiscalInformation {
  id: number;
  prefix: string;
  begin: number;
  end: number;
  dateValidFrom: string;
  dateValidTo: string;
  cai: string;
  currentNumber: number;
  range: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.sass'],
})
export class BillingComponent implements OnInit {
  // @ts-ignore

  displayedColumns: string[] = [
    'invoiceNumber',
    'customer',
    'createdDate',
    // 'expirationDate',
    'income',
    // 'condition',
    'actions',
  ];

  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly billingService: BillingService) {}

  async ngOnInit(): Promise<void> {
    const billingDataSource = await this.billingService.fetchAllBills();

    this.dataSource = new MatTableDataSource(billingDataSource);
    this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(inVoice: Invoice): Promise<void> {}

  async handleDeleteClick(inVoice: Invoice): Promise<void> {}

  async handlePrintInvoiceClick(invoice: Invoice): Promise<void> {
    const urlReport = this.billingService.getInvoicePdf(invoice);
    window.open(urlReport, '_blank');
  }

  async openDialog(): Promise<void> {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
