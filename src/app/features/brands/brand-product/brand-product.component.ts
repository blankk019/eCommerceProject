import { Product } from './../../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-brand-product',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './brand-product.component.html',
  styleUrl: './brand-product.component.css',
})
export class BrandProductComponent implements OnInit {
  brandId!: string;
  brandProducts: Product[] = [];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {
    this.brandId = this._ActivatedRoute.snapshot.paramMap.get('brandId')!;
  }

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((res) => {
      this.brandProducts = res.data.filter(
        (product) => product.brand._id === this.brandId
      );
      console.log(this.brandProducts);
    });
  }
}
