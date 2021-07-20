import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../app/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  public showConfirmDialog(
    title: string,
    question: string
  ): Observable<boolean> {
    const dialogResultReference = this.dialog.open(DialogComponent, {
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: {
        title,
        text: question,
        type: 'question',
      },
    });

    return dialogResultReference.afterClosed();
  }

  public showWarningDialog(
    title: string,
    message: string
  ): Observable<boolean> {
    const dialogResultReference = this.dialog.open(DialogComponent, {
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: {
        title,
        text: message,
        type: 'warning',
      },
    });

    return dialogResultReference.afterClosed();
  }
}
