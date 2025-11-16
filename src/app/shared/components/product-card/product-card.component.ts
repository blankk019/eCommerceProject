import { Component, Input, inject, OnDestroy } from '@angular/core';
//import { Product } from '../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

import { IProduct } from '../../../core/interfaces/iproduct';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnDestroy {
  @Input({ required: true }) product!: IProduct;
  //@Input({ required: true }) product!: Product;
  _cartService = inject(CartService);
  _WishlistService = inject(WishlistService);
  _ToastrService = inject(ToastrService);

  isInWishlist = false;

  toggleWishList(productId: string) {
    this.isInWishlist = !this.isInWishlist;
    this.addToWishList(productId);
  }
  private subscriptions = new Subscription();

  addToCart(productId: string): void {
    const cartSub = this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        this._ToastrService.success(response.message, 'cyber');
      },
    });
    this.subscriptions.add(cartSub);
  }

  addToWishList(productId: string): void {
    const wishlistSub = this._WishlistService
      .addToWishList(productId)
      .subscribe({
        next: (response) => {
          console.log('Product added to WishList:', response);
          this._ToastrService.success(response.message, 'cyber');
        },
      });
    this.subscriptions.add(wishlistSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
