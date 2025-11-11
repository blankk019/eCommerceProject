import { Component } from '@angular/core';
import { ShippingComponent } from './features/checkout/components/shipping/shipping.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  // 🔹 Auth layout routes (lazy loaded)
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AddressComponent } from './features/checkout/components/address/address.component';
import { ReceiptComponent } from './features/receipt/receipt.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },

  // 🔹 Main layout routes (lazy loaded)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(m => m.BrandsComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(m => m.CategoriesComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(m => m.CartComponent),
      },
        {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent),
      },
      {
        path: 'brands/:brandId/products',
        loadComponent: () =>
          import('./features/brands/brand-product/brand-product.component').then(m => m.BrandProductComponent),
      },
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

  // 🔹 404 page
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
