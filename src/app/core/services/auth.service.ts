import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  setRegisterForm(data: object) : Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }

  setLoginForm(data: object) : Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }

  saveUserData(): void {
    if(localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);

      console.log(this.userData);
    }
  }

  signOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);

  }

}
