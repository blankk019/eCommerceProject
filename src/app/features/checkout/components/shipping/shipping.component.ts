import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartModel } from '../../../../shared/models/cart.model';
import { OrdersService } from '../../../../core/services/orders.service';
import { AddressService } from '../../../../core/services/address.service';
import { SingleAddress } from '../../../../shared/models/address.model';
import { Subscription } from 'rxjs';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDate: string;
  isFree?: boolean;
  requiresDateSelection?: boolean;
}

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent implements OnInit, OnDestroy {
  cartId: string | null = null;
  addressId: string | null = null;

  shippingMethods: ShippingMethod[] = [];
  selectedShippingId: string | null = null;
  selectedDeliveryDate: string | null = null;
  showDatePicker: boolean = false;
  cart: CartModel | null = null;
  private subscriptions = new Subscription();

  constructor(
    private _CartService: CartService,
    private _OrdersService: OrdersService,
    private _AddressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get cartId from parent route
    const parentRouteSub = this.route.parent?.paramMap.subscribe((params) => {
      this.cartId = params.get('cartId');
      console.log('Cart ID in shipping component:', this.cartId);
    });
    if (parentRouteSub) {
      this.subscriptions.add(parentRouteSub);
    }

    // Get addressId from current route
    const routeSub = this.route.paramMap.subscribe((params) => {
      this.addressId = params.get('addressId');
      console.log('Address ID in shipping component:', this.addressId);
    });
    this.subscriptions.add(routeSub);

    // Load shipping methods
    this.loadShippingMethods();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadShippingMethods(): void {
    this.shippingMethods = [
      {
        id: '1',
        name: 'Free',
        description: 'Regulary shipment',
        price: 0,
        deliveryDate: '17 Oct, 2023',
        isFree: true,
      },
      {
        id: '2',
        name: '$8.50',
        description: 'Get your delivery as soon as possible',
        price: 8.5,
        deliveryDate: '1 Oct, 2023',
      },
      {
        id: '3',
        name: 'Schedule',
        description: 'Pick a date when you want to get your delivery',
        price: 0,
        deliveryDate: '',
        requiresDateSelection: true,
      },
    ];

    // Set default selected shipping method (Free)
    this.selectedShippingId = '1';
  }

  selectShippingMethod(methodId: string): void {
    this.selectedShippingId = methodId;
    const selectedMethod = this.shippingMethods.find((m) => m.id === methodId);

    // Reset date selection if not a schedule method
    if (selectedMethod && !selectedMethod.requiresDateSelection) {
      this.selectedDeliveryDate = null;
      this.showDatePicker = false;
    } else if (selectedMethod?.requiresDateSelection) {
      this.showDatePicker = true;
    }
  }

  onDateSelected(date: string): void {
    this.selectedDeliveryDate = date;
  }

  goBack(): void {
    // Navigate back to address step
    this.router.navigate(['../address'], { relativeTo: this.route.parent });
  }

  proceedToPayment(): void {
    if (!this.cartId || !this.addressId) {
      alert('Missing cart ID or address ID');
      return;
    }

    // Get address by ID from the address service
    const addressSub = this._AddressService
      .getAddressById(this.addressId)
      .subscribe({
        next: (response) => {
          console.log('Address fetched:', response);

          const address = response.data;

          // Extract into SingleAddress variable
          const singleAddress: SingleAddress = {
            details: address.details,
            phone: address.phone,
            city: address.city,
          };

          console.log('SingleAddress created:', singleAddress);

          // Pass to checkOutSession method
          const checkoutSub = this._OrdersService
            .checkOutSession(this.cartId!, singleAddress)
            .subscribe({
              next: (response) => {
                console.log('Checkout session created:', response);

                // Open Stripe URL in new window
                if (response.session && response.session.url) {
                  window.open(response.session.url, '_blank');
                } else {
                  alert('Payment URL not received');
                }
              },
              error: (err) => {
                console.error('Error creating checkout session:', err);
                alert('Failed to create checkout session');
              },
            });
          this.subscriptions.add(checkoutSub);
        },
        error: (err) => {
          console.error('Error fetching address:', err);
          alert('Failed to fetch address details');
        },
      });
    this.subscriptions.add(addressSub);
  }

  proceedToNext(): void {
    const selectedMethod = this.shippingMethods.find(
      (m) => m.id === this.selectedShippingId
    );

    // Validate that if schedule is selected, a date must be chosen
    if (selectedMethod?.requiresDateSelection && !this.selectedDeliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    if (this.selectedShippingId) {
      // TODO: Save selected shipping method and navigate to payment
      console.log('Proceed with shipping method:', this.selectedShippingId);
      if (this.selectedDeliveryDate) {
        console.log('Selected delivery date:', this.selectedDeliveryDate);
      }
    }
  }
}
