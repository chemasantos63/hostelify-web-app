import { Balance, BalanceService } from './../../services/balance.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { regexForNumbersWithDecimal } from 'src/app/shared/utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
})
export class BalanceComponent implements OnInit {
  usdExchangeRate: number;
  qtzExchangeRate: number;
  lpsCashTotal: number;
  usdCashTotal: number;
  qtzCashTotal: number;
  lpsCashForm: FormGroup;
  usdCashForm: FormGroup;
  qtzCashForm: FormGroup;
  debitForm: FormGroup;

  multiplexObj = {
    one: 1,
    two: 2,
    five: 5,
    ten: 10,
    twenty: 20,
    fivety: 50,
    oneHundred: 100,
    twoHundred: 200,
    fiveHundred: 500,
  };

  currentBalance!: Balance;

  columnsForDebitsTable = ['debitType', 'amount', 'actions'];

  dataSource = [];

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private datePipe: DatePipe
  ) {
    this.lpsCashTotal = 0;
    this.usdCashTotal = 0;
    this.qtzCashTotal = 0;
    this.usdExchangeRate = 0;
    this.qtzExchangeRate = 0;

    this.lpsCashForm = this.buildDenominationForm();
    this.usdCashForm = this.buildDenominationForm();
    this.qtzCashForm = this.buildDenominationForm();

    this.debitForm = this.fb.group({
      amount: new FormControl(0, [Validators.required]),
    });

    this.lpsCashForm.valueChanges.subscribe((formValue) => {
      this.lpsCashTotal = 0;
      Object.keys(formValue).forEach((k) => {
        this.lpsCashTotal +=
          formValue[k] *
          // @ts-ignore
          this.multiplexObj[
            Object.keys(this.multiplexObj).find((keyMulti) => keyMulti === k)!
          ];
      });
    });

    this.usdCashForm.valueChanges.subscribe((formValue) => {
      this.usdCashTotal = 0;
      Object.keys(formValue).forEach((k) => {
        this.usdCashTotal +=
          formValue[k] *
          // @ts-ignore
          this.multiplexObj[
            Object.keys(this.multiplexObj).find((keyMulti) => keyMulti === k)!
          ] *
          this.usdExchangeRate;
      });
    });

    this.qtzCashForm.valueChanges.subscribe((formValue) => {
      this.qtzCashTotal = 0;
      Object.keys(formValue).forEach((k) => {
        this.qtzCashTotal +=
          formValue[k] *
          // @ts-ignore
          this.multiplexObj[
            Object.keys(this.multiplexObj).find((keyMulti) => keyMulti === k)!
          ] *
          this.qtzExchangeRate;
      });
    });
  }

  private buildDenominationForm(): FormGroup {
    return this.fb.group({
      one: new FormControl(0, Validators.pattern(regexForNumbersWithDecimal)),
      two: new FormControl(0, Validators.pattern(regexForNumbersWithDecimal)),
      five: new FormControl(0, Validators.pattern(regexForNumbersWithDecimal)),
      ten: new FormControl(0, Validators.pattern(regexForNumbersWithDecimal)),
      twenty: new FormControl(
        0,
        Validators.pattern(regexForNumbersWithDecimal)
      ),
      fivety: new FormControl(
        0,
        Validators.pattern(regexForNumbersWithDecimal)
      ),
      oneHundred: new FormControl(
        0,
        Validators.pattern(regexForNumbersWithDecimal)
      ),
      twoHundred: new FormControl(
        0,
        Validators.pattern(regexForNumbersWithDecimal)
      ),
      fiveHundred: new FormControl(
        0,
        Validators.pattern(regexForNumbersWithDecimal)
      ),
    });
  }

  async ngOnInit(): Promise<void> {
    const userBalances = await this.balanceService.fetchBalancesByUser();
    const currentDateBalance = userBalances.find(
      (b) =>
        this.datePipe.transform(b.createdAt, `dd/MM/yyyy`) ===
        this.datePipe.transform(new Date(), `dd/MM/yyyy`)
    );

    if (currentDateBalance) {
      this.currentBalance = currentDateBalance;
    }
  }

  getBillingTotalFromCurrentBalance(): number {
    return this.currentBalance.invoices.reduce(
      (acc, act) => acc + +act.total.total,
      0
    );
  }

  getPaymentsTotalFromCurrentBalance(): number {
    return this.currentBalance.payments.reduce(
      (acc, act) => acc + +act.amount,
      0
    );
  }
}
