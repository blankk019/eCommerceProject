import { CartService } from '../../core/services/cart.service';
import { OrdersService } from './../../core/services/orders.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderResponse } from '../../shared/models/userOrder.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent implements OnInit, OnDestroy {
  userId: string = '';
  orders: OrderResponse[] = [];
  isLoading: boolean = true;
  private subscriptions = new Subscription();

  constructor(
    private _OrdersService: OrdersService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUserIdAndLoadOrders();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUserIdAndLoadOrders(): void {
    // Get user ID from token or cart service
    const token = localStorage.getItem('userToken');
    if (token) {
      // Decode token to get user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
      this.loadAllOrders();
    }
  }

  loadAllOrders(): void {
    this.isLoading = true;
    const ordersSub = this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (orders) => {
        console.log('User Orders:', orders);
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.isLoading = false;
      },
    });
    this.subscriptions.add(ordersSub);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getOrderStatus(order: OrderResponse): string {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Processing';
    return 'Pending Payment';
  }

  getStatusClass(order: OrderResponse): string {
    if (order.isDelivered) return 'status-delivered';
    if (order.isPaid) return 'status-processing';
    return 'status-pending';
  }

  // Calculate subtotal (sum of all items before shipping and tax)
  getSubtotal(order: OrderResponse): number {
    return order.cartItems.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  }

  // Calculate tax as 10% of subtotal
  getTax(order: OrderResponse): number {
    const subtotal = this.getSubtotal(order);
    return Number((subtotal * 0.1).toFixed(2));
  }

  // Get shipping cost based on the shipping price from order
  // If you want to use fixed shipping costs, you can modify this
  getShipping(order: OrderResponse): number {
    // Use the shipping price from the order, or default to 0 for free shipping
    return order.shippingPrice || 0;
  }

  // Calculate total: subtotal + shipping + tax
  getTotal(order: OrderResponse): number {
    const subtotal = this.getSubtotal(order);
    const shipping = this.getShipping(order);
    const tax = this.getTax(order);
    return Number((subtotal + shipping + tax).toFixed(2));
  }
}
