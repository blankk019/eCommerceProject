import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BrandsService } from '../../core/services/brands.service';
import { CategoriesService } from '../../core/services/categories.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Brand } from '../../shared/models/brand.model';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Subscription } from 'rxjs';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PaginationModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  paginatedProducts: IProduct[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];

  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 20;

  // Filter properties
  searchTerm: string = '';
  brandSearchTerm: string = '';
  selectedBrands: Set<string> = new Set();
  selectedCategories: Set<string> = new Set();
  minPrice: number = 0;
  maxPrice: number = 100000;
  priceRange: { min: number; max: number } = { min: 0, max: 100000 };
  sortBy: string = 'rating';
  private subscriptions = new Subscription();

  private readonly _ProductsService = inject(ProductsService);
  private readonly _BrandsService = inject(BrandsService);
  private readonly _CategoriesService = inject(CategoriesService);

  ngOnInit() {
    this.loadBrands();
    this.loadCategories();
    this.loadAllProducts();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Load ALL products at once
  loadAllProducts() {
    const productsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log('All products loaded:', res.data);
        this.allProducts = res.data;
        this.calculatePriceRange();
        this.applyFilters();
      },
    });
    this.subscriptions.add(productsSub);
  }

  loadBrands() {
    const brandsSub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
    });
    this.subscriptions.add(brandsSub);
  }

  loadCategories() {
    const categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
    this.subscriptions.add(categoriesSub);
  }

  calculatePriceRange() {
    if (this.allProducts.length > 0) {
      const prices = this.allProducts.map((p) => p.price);
      this.minPrice = Math.floor(Math.min(...prices));
      this.maxPrice = Math.ceil(Math.max(...prices));
      this.priceRange = { min: this.minPrice, max: this.maxPrice };
    }
  }

  // Search functionality
  onSearchChange() {
    this.applyFilters();
  }

  // Brand filter
  toggleBrand(brandId: string) {
    if (this.selectedBrands.has(brandId)) {
      this.selectedBrands.delete(brandId);
    } else {
      this.selectedBrands.add(brandId);
    }
    this.applyFilters();
  }

  isBrandSelected(brandId: string): boolean {
    return this.selectedBrands.has(brandId);
  }

  // Category filter
  toggleCategory(categoryId: string) {
    if (this.selectedCategories.has(categoryId)) {
      this.selectedCategories.delete(categoryId);
    } else {
      this.selectedCategories.add(categoryId);
    }
    this.applyFilters();
  }

  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.has(categoryId);
  }

  // Price range filter
  onPriceRangeChange() {
    this.applyFilters();
  }

  // Sort functionality
  onSortChange() {
    this.applySort();
  }

  // Apply all filters
  applyFilters() {
    this.filteredProducts = this.allProducts.filter((product) => {
      // Search filter
      const matchesSearch = product.title
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      // Brand filter
      const matchesBrand =
        this.selectedBrands.size === 0 ||
        this.selectedBrands.has(product.brand._id);

      // Category filter
      const matchesCategory =
        this.selectedCategories.size === 0 ||
        this.selectedCategories.has(product.category._id);

      // Price filter
      const matchesPrice =
        product.price >= this.priceRange.min &&
        product.price <= this.priceRange.max;

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });

    this.applySort();
    this.totalItems = this.filteredProducts.length;
    this.currentPage = 1; // Reset to first page when filters change
    this.updatePaginatedProducts();
  }

  // Apply sorting
  applySort() {
    switch (this.sortBy) {
      case 'rating':
        this.filteredProducts.sort(
          (a, b) => b.ratingsAverage - a.ratingsAverage
        );
        break;
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    this.updatePaginatedProducts();
  }

  // Update products for current page
  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Get filtered brands based on search
  getFilteredBrands(): Brand[] {
    if (!this.brandSearchTerm) {
      return this.brands;
    }
    return this.brands.filter((brand) =>
      brand.name.toLowerCase().includes(this.brandSearchTerm.toLowerCase())
    );
  }

  // Get brand name by ID
  getBrandName(brandId: string): string {
    return this.brands.find((b) => b._id === brandId)?.name || '';
  }

  // Get category name by ID
  getCategoryName(categoryId: string): string {
    return this.categories.find((c) => c._id === categoryId)?.name || '';
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.brandSearchTerm = '';
    this.selectedBrands.clear();
    this.selectedCategories.clear();
    this.priceRange = { min: this.minPrice, max: this.maxPrice };
    this.sortBy = 'rating';
    this.applyFilters();
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.updatePaginatedProducts();
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
