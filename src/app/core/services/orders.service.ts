import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleAddress } from '../../shared/models/address.model';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../shared/models/orders.model';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}

  private readonly baseUrl = 'https://ecommerce.routemisr.com/api/v1/orders';
  private readonly headers = { token: localStorage.getItem('userToken') || '' };
  // checkout session
  checkOutSession(
    cartId: string,
    shippingAddress: SingleAddress
  ): Observable<OrderResponse> {
    const url = `${this.baseUrl}/checkout-session/${cartId}?url=http://localhost:4200`;
    return this._HttpClient.post<OrderResponse>(
      url,
      { shippingAddress: shippingAddress },
      {
        headers: this.headers,
      }
    );
  }

  //get user orders
  getUserOrders(cartId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`
    );
  }
}
