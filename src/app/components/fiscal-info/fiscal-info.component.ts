import { MatPaginator } from '@angular/material/paginator';
import { CreateupdatefiscalinfoComponent } from './../fiscal-info/createupdatefiscalinfo/createupdatefiscalinfo.component';
import { ToastrService } from 'ngx-toastr';
import { FiscalInfoService } from './../../services/fiscal-info.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

export interface FiscalInfo {
  id: number;
  prefix: string;
  begin: number;
  end: number;
  cai: string;
  status: string;
  dateValidFrom: Date;
  dateValidTo: Date;
  currentNumber: number;
  range: number;
}

@Component({
  selector: 'app-fiscal-info',
  templateUrl: './fiscal-info.component.html',
  styleUrls: ['./fiscal-info.component.sass'],
})
export class FiscalInfoComponent implements OnInit {
  displayColumns: string[] = [
    'prefix',
    'begin',
    'end',
    'cai',
    'status',
    'dateValidFrom',
    'dateValidTo',
    'currentNumber',
    'range',
    'actions',
  ];

  dataSource: MatTableDataSource<FiscalInfo> = new MatTableDataSource();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private readonly fiscalInfoService: FiscalInfoService,
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
      .open(CreateupdatefiscalinfoComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  private async refreshDataSource(dialogRef: any) {
    if (dialogRef) {
      this.dataSource = new MatTableDataSource(
        await this.fiscalInfoService.fetchAllInfo()
      );
    }
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    const fiscalInfoDataSource = await this.fiscalInfoService.fetchAllInfo();

    this.dataSource = new MatTableDataSource(fiscalInfoDataSource);
    this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(fiscalInfo: FiscalInfo): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateupdatefiscalinfoComponent, {
        data: {
          fiscalInfo,
        },
      })
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  async handleDeleteClick(fiscalInfo: FiscalInfo): Promise<void> {
    const result = await this.fiscalInfoService.deleteInfoById(fiscalInfo.id);
    if (result) {
      alert('Se deshabllitaron los datos con exito');
      this.refreshDataSource(true);
    }
  }

  private showSuccessToast(dialogRef: any) {
    if (dialogRef) {
      this.toastr.success('Datos Guardados', 'Operacion Exitosa');
    }
  }
}
