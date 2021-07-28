import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../components/products/products.component';
import { ApiPath } from '../shared/endpoints';

export interface ProductDto {
  description: string;
  code: string;
  price: string;
  stock: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  async fetchProductById(id: number): Promise<Product> {
    return this.http
      .get<Product>(`${environment.BASE_URI}/${ApiPath.GetAllProducts}/${id}`)
      .toPromise();
  }

  async fetchAllProducts(): Promise<Product[]> {
    return this.http
      .get<Product[]>(`${environment.BASE_URI}/${ApiPath.GetAllProducts}`)
      .toPromise();
  }

  async createProduct(productDto: ProductDto): Promise<Product> {
    return this.http
      .post<Product>(
        `${environment.BASE_URI}/${ApiPath.GetAllProducts}`,
        productDto
      )
      .toPromise();
  }

  async updateProductById(
    id: number,
    productDto: ProductDto
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllProducts}/${id}`,
        productDto
      )
      .toPromise();
  }

  async deleteProductById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllProducts}/${id}`
      )
      .toPromise();
  }
}
