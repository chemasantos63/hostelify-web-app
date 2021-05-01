import { Roomer } from './../roomer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomerService } from './../../../services/roomer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-update-roomer',
  templateUrl: './create-update-roomer.component.html',
  styleUrls: ['./create-update-roomer.component.sass'],
})
export class CreateUpdateRoomerComponent implements OnInit {
  createUpdateRoomerForm: FormGroup;
  creatingRoomer = true;
 
  constructor(
    private formBuilder: FormBuilder,
    private roomerService: RoomerService,
    @Inject(MAT_DIALOG_DATA) public data: { roomer: Roomer },
    private dialogRef: MatDialogRef<CreateUpdateRoomerComponent>
  ) {
    this.createUpdateRoomerForm = this.formBuilder.group({
      name: data ? data.roomer.name : '',
      lastname: data ? data.roomer.lastname : '',
      identification: data ? data.roomer.identification : '',
      nationality: data ? data.roomer.nationality : '',
      origin: data ? data.roomer.origin : '',
      destination: data ? data.roomer.destination : '',
      occupation: data ? data.roomer.occupation : '',
      phone: data ? data.roomer.phone : '',
    });
    if (data) {
      this.creatingRoomer = false;
    }
  }

  async handleSubmit() {
    try {
      if (this.creatingRoomer) {
        await this.roomerService.createRoomer(
          this.createUpdateRoomerForm.value
        );
      } else {
        await this.roomerService.updateRoomerById(
          this.data.roomer.id,
          this.createUpdateRoomerForm.value
        );
      }
      this.closeDialog(true);
    } catch (e) {
      this.closeDialog(false);
    }
  }
  ngOnInit(): void {}

  closeDialog(success?: boolean): void {
    this.dialogRef.close(success);
  }
}
