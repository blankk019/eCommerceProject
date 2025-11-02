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

export const routes: Routes = [
    {path: '', component: AuthLayoutComponent, children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent}
    ]},
    {path: '', component: MainLayoutComponent, children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'products', component: ProductsComponent},
        {path: 'brands', component: BrandsComponent},
        {path: 'categories', component: CategoriesComponent},
        {path: 'cart', component: CartComponent}
    ]},
    {path: '**', component: NotFoundComponent}


];
