import { Component, OnInit } from '@angular/core';
import {
  RouterLinkActive,
  RouterOutlet,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartId: string | null = null;

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    // Get cartId from route parameters
    this.route.paramMap.subscribe((params) => {
      this.cartId = params.get('cartId');
      console.log('Cart ID received in checkout:', this.cartId);
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
