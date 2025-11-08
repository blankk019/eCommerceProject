import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../../shared/models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  // Implementation to fetch all products
  getAllProducts() {
    return this._HttpClient.get<ProductResponse>(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getProductsByPage(page: number = 1, limit: number = 20): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
  }
}
