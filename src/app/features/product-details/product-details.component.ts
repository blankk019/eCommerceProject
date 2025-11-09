import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

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
   items : 1,
    nav: false
  }

  detailsProduct : IProduct | null = null;

  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let id = params.get('id');

      this._ProductsService.getSpecificProduct(id).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.detailsProduct = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
   })
    
  }



}
