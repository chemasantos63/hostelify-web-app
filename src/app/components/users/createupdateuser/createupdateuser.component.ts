import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-createupdateuser',
  templateUrl: './createupdateuser.component.html',
  styleUrls: ['./createupdateuser.component.sass'],
})
export class CreateupdateuserComponent implements OnInit {
  createUpdateUserForm: FormGroup;
  creatingUser = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private dialogRef: MatDialogRef<CreateupdateuserComponent>
  ) {
    this.createUpdateUserForm = this.formBuilder.group({
      username: data ? data.user.username : '',
      email: data ? data.user.email : '',
      password: data ? data.user.password : '',
      status: data ? data.user.status : '',
    });

    if (data) {
      this.creatingUser = false;
    }
  }

  async handleSubmit() {
    try {
      if (this.creatingUser) {
        await this.userService.createUser(this.createUpdateUserForm.value);
      } else {
        await this.userService.updateUserById(
          this.data.user.id!,
          this.createUpdateUserForm.value
        );
      }
      this.closeDialog(true);
    } catch (e) {
      this.closeDialog(false);
    }
  }

  
  ngOnInit(): void {}

  closeDialog(success?: boolean) : void {
    this.dialogRef.close(success);
  }
}
