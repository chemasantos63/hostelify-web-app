import { Role } from './../user-roles.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from './../../../services/role.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, QueryList, Inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-createupdateroles',
  templateUrl: './createupdateroles.component.html',
  styleUrls: ['./createupdateroles.component.sass'],
})
export class CreateupdaterolesComponent implements OnInit {
  // @ts-ignore
  @ViewChild(MatFormField) formFields: QueryList<MatFormField>;
  estado?: String;
  createUpdateRoleForm: FormGroup;
  creatingRole = true;
  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: { role: Role },
    private dialogRef: MatDialogRef<CreateupdaterolesComponent>
  ) {
    this.createUpdateRoleForm = this.formBuilder.group({
      name: data ? data.role.name : '',
      description: data ? data.role.description : '',
      status: data ? data.role.status : '',
    });

    if (data) {
      this.creatingRole = false;
    }
  }

  async handleSubmit() {
    if (this.createUpdateRoleForm.controls.status.value) {
      this.estado = 'ACTIVE';
    }
    try {
      if (this.creatingRole) {
        await this.roleService.createRole({
          ...this.createUpdateRoleForm.value,
          status: this.estado,
        });
      } else {
        await this.roleService.updateRoleById(
          this.data.role.id,
          this.createUpdateRoleForm.value
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
