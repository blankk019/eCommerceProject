import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PaginationModule, CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {

     products: IProduct[] = [];
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 20;

  private readonly _ProductsService = inject(ProductsService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = 1) {
    this._ProductsService.getProductsByPage(page, this.itemsPerPage).subscribe({
      next: (res) => {
        console.log(res.data)
        this.products = res.data;
        this.totalItems = res.results; 
        this.currentPage = res.metadata.currentPage;
      }
    });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.loadProducts(this.currentPage);
  }
}
