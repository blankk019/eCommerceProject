import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, AddressResponse } from '../../shared/models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private _httpClient: HttpClient;
  constructor(_HttpClient: HttpClient) {
    this._httpClient = _HttpClient;
  }

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/addresses';
  private myHeader = { token: localStorage.getItem('userToken') || '' };

  //get all addresses for logged in user
  getAddresses(): Observable<any> {
    return this._httpClient.get(this.apiUrl, { headers: this.myHeader });
  }

  //get address by id
  getAddressById(id: string): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/${id}`, {
      headers: this.myHeader,
    });
  }

  //add new address
  addAddress(addressData: Address): Observable<any> {
    return this._httpClient.post(this.apiUrl, addressData, {
      headers: this.myHeader,
    });
  }

  //update address by id
  updateAddress(id: string, addressData: Address): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/${id}`, addressData, {
      headers: this.myHeader,
    });
  }

  //delete address by id
  deleteAddress(id: string): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/${id}`, {
      headers: this.myHeader,
    });
  }
}
