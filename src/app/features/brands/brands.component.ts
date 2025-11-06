import { Brand } from './../../shared/models/brand.model';
import { BrandsService } from './../../core/services/brands.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BrandCardComponent } from '../../shared/components/brand-card/brand-card.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [BrandCardComponent],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  //inject BrandsService and use it to fetch and display brands
  constructor(private _BrandsService: BrandsService) {}

  brands: Brand[] = [];

  ngOnInit() {
    this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (err) => console.error('Error fetching brands:', err),
    });
  }
}
