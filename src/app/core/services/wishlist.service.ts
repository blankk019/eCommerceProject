import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iwishlist } from '../interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient : HttpClient) { }

    apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

     addToWishList(id: string): Observable<any> {
        return this._HttpClient.post(
          this.apiUrl,
          { productId: id },
        );
      }

      getWishList(): Observable<Iwishlist> {
        return this._HttpClient.get<Iwishlist>(this.apiUrl);
      }

      deleteFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.apiUrl}/${productId}`    
    );
  }

}
