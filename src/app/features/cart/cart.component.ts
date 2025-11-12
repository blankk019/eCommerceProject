import { Component, OnInit, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductElement } from '../../shared/models/cart.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ProductElement[] = [];
  subtotal: number = 0;
  estimatedTax: number = 0;
  shippingHandling: number = 0;
  total: number = 0;
  discountCode: string = '';
  discountApplied: boolean = false;
  cartId!: string;
  private subscriptions = new Subscription();

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
    const decSub = this._cartService
      .updateCartQuantity(count, productId)
      .subscribe({
        next: (response) => {
          console.log('Cart quantity updated:', response.status);
          this._ToastrService.success("Product Count Decreased Sucessfully", "cyber")
          this.cartItems = response.data.products;
          this.subtotal = response.data.totalCartPrice;
          this.estimatedTax = this.subtotal * 0.1;
          this.total =
            this.subtotal + this.estimatedTax + this.shippingHandling;
        },
        error: (error) => {
          console.error('Error updating cart quantity:', error);
        },
      });
    this.subscriptions.add(decSub);
  }

  incCount(productId: string, count: number): void {
    //increase count
    count++;
    //calls upon the service
    const incSub = this._cartService
      .updateCartQuantity(count, productId)
      .subscribe({
        next: (response) => {
          console.log('Cart quantity updated:', response.status);
          this._ToastrService.success("Product Count Increased Sucessfully", "cyber")
          this.cartItems = response.data.products;
          this.subtotal = response.data.totalCartPrice;
          this.estimatedTax = this.subtotal * 0.1;
          this.total =
            this.subtotal + this.estimatedTax + this.shippingHandling;
        },
        error: (error) => {
          console.error('Error updating cart quantity:', error);
        },
      });
    this.subscriptions.add(incSub);
  }

  deleteFromCart(productId: string): void {
    const deleteSub = this._cartService.deleteFromCart(productId).subscribe({
      next: (response) => {
        console.log('Item removed from cart:', response.status);
        this._ToastrService.success("Product Deleted From Cart Sucessfully", "cyber")
        this.cartItems = this.cartItems.filter(
          (item) => item.product._id !== productId
        );
      },
     
    });
    this.subscriptions.add(deleteSub);
  }

  ngOnInit(): void {
    // Fetch cart items from service and calculate totals
    const cartSub = this._cartService.getCart().subscribe({
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
    this.subscriptions.add(cartSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
