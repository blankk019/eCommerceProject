import { Component } from '@angular/core';
import { ShippingComponent } from './features/checkout/components/shipping/shipping.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CartComponent } from './features/cart/cart.component';
import { BrandProductComponent } from './features/brands/brand-product/brand-product.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AddressComponent } from './features/checkout/components/address/address.component';
import { ReceiptComponent } from './features/receipt/receipt.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'brands/:brandId/products', component: BrandProductComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'checkout/:cartId',
        component: CheckoutComponent,
        children: [
          { path: '', redirectTo: 'address', pathMatch: 'full' },
          { path: 'address', component: AddressComponent },
          { path: 'shipping/:addressId', component: ShippingComponent },
        ],
      },
      { path: 'allorders', component: ReceiptComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
