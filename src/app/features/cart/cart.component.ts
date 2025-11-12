import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductElement } from '../../shared/models/cart.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: ProductElement[] = [];
  subtotal: number = 0;
  estimatedTax: number = 0;
  shippingHandling: number = 0;
  total: number = 0;
  discountCode: string = '';
  discountApplied: boolean = false;
  cartId!: string;

  private _cartService = inject(CartService);
  _ToastrService = inject(ToastrService)

  applyDiscount(): void {
    if (this.discountCode === 'ANG25OFF') {
      this.discountApplied = true;
      this.total *= 0.75;
    }
  }

  //Count controll methods
  decCount(productId: string, count: number): void {
    //decrease count
    if (count > 1) count--;
    //calls upon the service
    this._cartService.updateCartQuantity(count, productId).subscribe({
      next: (response) => {
        console.log('Cart quantity updated:', response.status);
        this.cartItems = response.data.products;
        this.subtotal = response.data.totalCartPrice;
        this.estimatedTax = this.subtotal * 0.1;
        this.total = this.subtotal + this.estimatedTax + this.shippingHandling;
        this._ToastrService.success("Count decreased sucessfully", "cyber")
      },
      
    });
  }
  incCount(productId: string, count: number): void {
    //increase count
    count++;
    //calls upon the service
    this._cartService.updateCartQuantity(count, productId).subscribe({
      next: (response) => {
        console.log('Cart quantity updated:', response.status);
        this.cartItems = response.data.products;
        this.subtotal = response.data.totalCartPrice;
        this.estimatedTax = this.subtotal * 0.1;
        this.total = this.subtotal + this.estimatedTax + this.shippingHandling;
        this._ToastrService.success("Count increased sucessfully", "cyber")
      },
      
    });
  }

  deleteFromCart(productId: string): void {
    this._cartService.deleteFromCart(productId).subscribe({
      next: (response) => {
        console.log('Item removed from cart:', response.status);
        this._ToastrService.success("Product Deleted From Cart Sucessfully", "cyber")
        this.cartItems = this.cartItems.filter(
          (item) => item.product._id !== productId
        );
      },
     
    });
  }

  ngOnInit(): void {
    // Fetch cart items from service and calculate totals
    this._cartService.getCart().subscribe({
      next: (response) => {
        console.log('Cart id fetched:', response.cartId);
        this.cartId = response.cartId;
        this.cartItems = response.data.products;
        this.subtotal = response.data.totalCartPrice;
        this.estimatedTax = this.subtotal * 0.1;
        this.shippingHandling = 5;
        this.total = this.subtotal + this.estimatedTax + this.shippingHandling;
      },
      
    });
  }
}
