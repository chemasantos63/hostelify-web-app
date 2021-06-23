
import { CreateupdateuserComponent } from './createupdateuser/createupdateuser.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'username',
    'email',
    'status',
  ]

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

     // @ts-ignore
     //@ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog, private readonly userService: UserService, private toastr: ToastrService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog.open(CreateupdateuserComponent).afterClosed().toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  private async refreshDataSource(dialogRef: any){
    if (dialogRef) {
      this.dataSource = new MatTableDataSource(
        await this.userService.fetchAllUsers()
      );
    }
    //this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    const userDataSource = await this.userService.fetchAllUsers();

    this.dataSource = new MatTableDataSource(userDataSource);
   // this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(user:User): Promise<void> {
    const dialogRef = this.dialog.open(CreateupdateuserComponent, {
      data: {
        user,
      },
    });
  }

  async handleDeleteClick(user: User): Promise<void> {
    const result = await this.userService.deleteUserById(user.id!)
    if (result) {
      alert(`Se borro el usuario exitosamente`);
      this.refreshDataSource(true);
    }
  }

  private showSuccessToast(dialogRef: any){
    if (dialogRef) {
      this.toastr.success('Usuario Creado', 'Operacion Exitosa');
    }
  }
}
