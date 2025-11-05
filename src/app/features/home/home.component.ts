import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);

  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];

  getAllProductsSub!:Subscription;

    customOptionsCat: OwlOptions = {
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
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

   customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  ngOnInit(): void {

    this._CategoriesService.getAllCategories().subscribe({
      next : (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },

      error : (err) => {
        console.log(err);
      }
    })

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next : (res) => {
        console.log(res.data);

        this.productsList = res.data;
      },

      error : (err) => {
        console.log(err);
      }
    })
    
  }

  ngOnDestroy(): void {

    this.getAllProductsSub?.unsubscribe();
  }

  
}