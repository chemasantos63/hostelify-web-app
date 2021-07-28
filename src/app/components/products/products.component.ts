import { UpdateCreateProductsComponent } from './update-create-products/update-create-products.component';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

export interface Product {
  id: number;
  description: string;
  code: string;
  price: number;
  stock: number;
  status: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'description',
    'code',
    'price',
    'stock',
    'status',
  ];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private readonly productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog
      .open(UpdateCreateProductsComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  private async refreshDataSource(dialogRef: any) {
    if (dialogRef) {
      this.dataSource = new MatTableDataSource(
        await this.productsService.fetchAllProducts()
      );
    }
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    const productsDataSource = await this.productsService.fetchAllProducts();

    this.dataSource = new MatTableDataSource(productsDataSource);
    this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(product: Product): Promise<void> {
    const dialogRef = this.dialog.open(UpdateCreateProductsComponent, {
      data: {
        product,
      },
    });
  }

  async handleDeleteClick(product: Product): Promise<void> {
    const result = await this.productsService.deleteProductById(product.id);
    if (result) {
      alert('Se ha desactivado el producto exitosamente.');
      this.refreshDataSource(true);
    }
  }

  private showSuccessToast(dialogRef: any) {
    if (dialogRef) {
      this.toastr.success('Producto Creado', 'Operacion Exitosa');
    }
  }
}
