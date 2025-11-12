import { Product } from './../../../shared/models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-product',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './brand-product.component.html',
  styleUrl: './brand-product.component.css',
})
export class BrandProductComponent implements OnInit, OnDestroy {
  brandId!: string;
  brandProducts: Product[] = [];
  private subscriptions = new Subscription();

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {
    this.brandId = this._ActivatedRoute.snapshot.paramMap.get('brandId')!;
  }

  ngOnInit(): void {
    const productsSub = this._ProductsService
      .getAllProducts()
      .subscribe((res) => {
        this.brandProducts = res.data.filter(
          (product) => product.brand._id === this.brandId
        );
        console.log(this.brandProducts);
      });
    this.subscriptions.add(productsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
