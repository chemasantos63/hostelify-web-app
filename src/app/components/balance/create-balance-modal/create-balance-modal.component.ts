import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Balance, BalanceService } from 'src/app/services/balance.service';
import { regexForNumbersWithDecimal } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-balance-modal',
  templateUrl: './create-balance-modal.component.html',
  styleUrls: ['./create-balance-modal.component.sass'],
})
export class CreateBalanceModalComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;

  currentDate: Date = new Date();

  createBalanceForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lastBalance: Balance },
    private balanceService: BalanceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBalanceModalComponent>
  ) {
    this.createBalanceForm = this.fb.group({
      initialBalance: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(regexForNumbersWithDecimal),
      ]),
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(
      () => this.formFields.forEach((ff) => ff.updateOutlineGap()),
      100
    );
  }

  async handleCreateBalanceClick(): Promise<void> {
    const createBalanceResult = await this.balanceService.createBalance(
      this.createBalanceForm.value
    );

    console.log(createBalanceResult);

    this.dialogRef.close(true);
  }
}
