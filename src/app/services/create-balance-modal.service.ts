import { CreateBalanceModalComponent } from './../components/balance/create-balance-modal/create-balance-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Balance } from './balance.service';

@Injectable({
  providedIn: 'root',
})
export class CreateBalanceModalService {
  constructor(private dialogService: MatDialog) {}

  async show(lastBalance?: Balance): Promise<any> {
    return this.dialogService
      .open(CreateBalanceModalComponent, {
        data: {
          lastBalance,
        },
        maxWidth: '25vw',
      })
      .afterClosed()
      .toPromise();
  }
}
