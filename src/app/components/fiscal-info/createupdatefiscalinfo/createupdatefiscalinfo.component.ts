import { MatFormField } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FiscalInfo } from './../fiscal-info.component';
import { FiscalInfoService } from './../../../services/fiscal-info.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-createupdatefiscalinfo',
  templateUrl: './createupdatefiscalinfo.component.html',
  styleUrls: ['./createupdatefiscalinfo.component.sass'],
})
export class CreateupdatefiscalinfoComponent implements OnInit {
  // @ts-ignore
  @ViewChildren(MatFormField) formFields: QueryList<MatFormField>;

  createFiscalForm: FormGroup;
  creatingInfo = true;

  constructor(
    private formBuilder: FormBuilder,
    private fiscalInfoService: FiscalInfoService,
    @Inject(MAT_DIALOG_DATA) public data: { fiscalInfo: FiscalInfo },
    private dialogRfe: MatDialogRef<CreateupdatefiscalinfoComponent>
  ) {
    this.createFiscalForm = this.formBuilder.group({
      prefix: data ? data.fiscalInfo.prefix : '',
      begin: data ? data.fiscalInfo.begin : '',
      end: data ? data.fiscalInfo.end : '',
      cai: data ? data.fiscalInfo.cai : '',
      status: data ? data.fiscalInfo.status : '',
      dateValidTo: data ? data.fiscalInfo.dateValidTo : '',
      dateValidFrom: data ? data.fiscalInfo.dateValidFrom : '',
    });

    if (data) {
      this.creatingInfo = false;
    }
  }

  async handleSubmit() {
    try {
      if (this.creatingInfo) {
        await this.fiscalInfoService.createFiscalInfo({
          ...this.createFiscalForm.value,
          currentNumber: this.createFiscalForm.value.begin,
          range:
            this.createFiscalForm.value.end -
            (this.createFiscalForm.value.begin - 1),
        });
      } else {
        await this.fiscalInfoService.updateFiscalInfoById(
          this.data.fiscalInfo.id,
          this.createFiscalForm.value
        );
      }
      this.closeDialog(true);
    } catch (e) {
      this.closeDialog(false);
    }
  }
  ngOnInit(): void {}

  closeDialog(success?: boolean): void {
    this.dialogRfe.close(success);
  }
}
