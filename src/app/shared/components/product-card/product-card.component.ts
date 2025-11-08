import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  _cartService = inject(CartService);

  addToCart(productId: string): void {
    this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      },
    });
  }
}
