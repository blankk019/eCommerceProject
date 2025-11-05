import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponse } from '../../shared/models/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<BrandResponse> {
    return this._HttpClient.get<BrandResponse>(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }

  getBrandById(id: string): Observable<BrandResponse> {
    return this._HttpClient.get<BrandResponse>(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }
}
