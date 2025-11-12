import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
   _cartService = inject(CartService);
   _WishlistService = inject(WishlistService);
   _ToastrService = inject(ToastrService)
  

  private subscriptions = new Subscription();

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  detailsProduct: IProduct | null = null;

  ngOnInit(): void {
    const routeSub = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');

        const productSub = this._ProductsService
          .getSpecificProduct(id)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.detailsProduct = res.data;
            },
            error: (err) => {
              console.log(err);
            },
          });
        this.subscriptions.add(productSub);
      },
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

     addToCart(productId: string): void {
      this._cartService.addToCart(productId).subscribe({
        next: (response) => {
          console.log('Product added to cart:', response);
          this._ToastrService.success(response.message, "cyber")
        },
        
      });
    }
  

  addToWishList(productId: string): void {
    const wishlistSub = this._WishlistService
      .addToWishList(productId)
      .subscribe({
        next: (response) => {
          console.log('Product added to WishList:', response);
          this._ToastrService.success(response.message, "cyber")
        },
      });
    this.subscriptions.add(wishlistSub);
  }
}
