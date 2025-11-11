import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';


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
   
      {
        path: 'checkout/:cartId',
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
        children: [
          { path: '', redirectTo: 'address', pathMatch: 'full' },
          { path: 'address', loadComponent: () => import('./features/checkout/components/address/address.component').then(m => m.AddressComponent)},
          { path: 'shipping/:addressId', loadComponent: () => import('./features/checkout/components/shipping/shipping.component').then(m => m.ShippingComponent) },
        ],
      },
      { path: 'allorders', loadComponent: () => import('./features/receipt/receipt.component').then(m => m.ReceiptComponent) },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
