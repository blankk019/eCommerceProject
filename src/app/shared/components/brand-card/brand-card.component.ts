import { Component, Input } from '@angular/core';
import { Brand, BrandModel } from '../../models/brand.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class BrandCardComponent {
  @Input({ required: true }) brand!: Brand;
}
