import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit, OnDestroy {
  _WishlistService = inject(WishlistService);
  _CartService = inject(CartService);
  _ToastrService = inject(ToastrService);

  wishlistItems: Iwishlist['data'] = [];
  private subscriptions = new Subscription();

  ngOnInit(): void {
    const wishlistSub = this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.wishlistItems = response.data || [];
        console.log('Wishlist items fetched:', this.wishlistItems);
      },
    });
    this.subscriptions.add(wishlistSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCart(productId: string): void {
    const cartSub = this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log('Added to cart:', res);
        this._ToastrService.success(res.message, "cyber")
        this.deleteFromWishlist(productId);
      },
    });
    this.subscriptions.add(cartSub);
  }

  deleteFromWishlist(productId: string): void {
    const deleteSub = this._WishlistService
      .deleteFromWishlist(productId)
      .subscribe({
        next: (res) => {
          console.log('Removed from wishlist:', res);
          this._ToastrService.success(res.message, "cyber")
          this.wishlistItems = this.wishlistItems.filter(
            (item) => item._id !== productId
          );
        },
      });
    this.subscriptions.add(deleteSub);
  }
}
