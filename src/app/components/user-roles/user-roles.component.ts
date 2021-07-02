import { CreateupdaterolesComponent } from './createupdateroles/createupdateroles.component';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from './../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

export interface Role {
  id: number;
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.sass'],
})
export class UserRolesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'status'];

  dataSource: MatTableDataSource<Role> = new MatTableDataSource();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private readonly roleService: RoleService,
    private toastr: ToastrService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  private async refreshDataSource(dialogRef: any) {
    if (dialogRef) {
      this.dataSource = new MatTableDataSource(
        await this.roleService.fetchAllRoles()
      );
    }
    this.dataSource.paginator = this.paginator;
  }

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateupdaterolesComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  async ngOnInit(): Promise<void> {
    const roleDataSource = await this.roleService.fetchAllRoles();

    this.dataSource = new MatTableDataSource(roleDataSource);
    this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(role: Role): Promise<void> {
    const dialogRef = this.dialog.open(CreateupdaterolesComponent, {
      data: { role },
    });
  }

  async handleDeteleClick(role: Role): Promise<void>{
    const result = await this.roleService.deleteRoleById(role.id);
    if (result) {
      alert(`Se borro el cliente exitosamente`);
      this.refreshDataSource(true);
    }
  }

  private showSuccessToast(dialogRef: any) {
    if (dialogRef) {
      this.toastr.success('Cliente Rol', 'Operacion Exitosa');
    }
  }
}
