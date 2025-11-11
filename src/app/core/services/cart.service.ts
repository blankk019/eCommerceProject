import { CartModel } from './../../shared/models/cart.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  //static URL and headers
  apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';
  myHeader = { token: localStorage.getItem('userToken') || '' };

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl,
      { productId: id },
    );
  }

  getCart(): Observable<CartModel> {
    return this._HttpClient.get<CartModel>(this.apiUrl);
  }

  updateCartQuantity(itemCount: number, productId: string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: itemCount },
      
    );
  }

  deleteFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
     
    );
  }
}
