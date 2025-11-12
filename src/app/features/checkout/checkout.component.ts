import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RouterLinkActive,
  RouterOutlet,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartId: string | null = null;
  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    // Get cartId from route parameters
    const routeSub = this.route.paramMap.subscribe((params) => {
      this.cartId = params.get('cartId');
      console.log('Cart ID received in checkout:', this.cartId);
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
