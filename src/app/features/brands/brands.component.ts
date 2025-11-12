import { Brand } from './../../shared/models/brand.model';
import { BrandsService } from './../../core/services/brands.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrandCardComponent } from '../../shared/components/brand-card/brand-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [BrandCardComponent],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, OnDestroy {
  brands: Brand[] = [];
  private subscriptions = new Subscription();

  constructor(private _BrandsService: BrandsService) {}

  ngOnInit() {
    const brandsSub = this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (err) => console.error('Error fetching brands:', err),
    });
    this.subscriptions.add(brandsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
