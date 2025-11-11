import { Address } from './../../../../shared/models/address.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../../core/services/address.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddressId: string | null = null;
  addFormOpen = false;
  cartId: string | null = null;

  //reactive add form
  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.addForm.valid) {
      // Create address object without _id (backend generates it)
      const newAddress = {
        name: this.addForm.value.name!,
        city: this.addForm.value.city!,
        details: this.addForm.value.details!,
        phone: this.addForm.value.phone!,
      };

      this.addressService.addAddress(newAddress as Address).subscribe({
        next: (response) => {
          console.log('Address added successfully:', response);
          // Reload all addresses from the server to get the complete list
          this.loadAddresses();
          this.addForm.reset();
          this.addFormOpen = false;
        },
        error: (err) => {
          console.error('Error adding address:', err);
        },
      });
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.addForm.controls).forEach((key) => {
        this.addForm.get(key)?.markAsTouched();
      });
    }
  }

  openAddForm(): void {
    this.addFormOpen = true;
  }
  closeAddForm(): void {
    this.addForm.reset();
    this.addFormOpen = false;
  }

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get cartId from parent route
    this.route.parent?.paramMap.subscribe((params) => {
      this.cartId = params.get('cartId');
      console.log('Cart ID in address component:', this.cartId);
    });

    this.loadAddresses();
  }

  loadAddresses(): void {
    //load data  from API
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        this.addresses = response.data;
        console.log('Addresses loaded:', this.addresses);
      },
      error: (err) => {
        console.error('Error loading addresses:', err);
      },
    });
  }

  selectAddress(addressId: string): void {
    this.selectedAddressId = addressId;
  }

  editAddress(addressId: string): void {
    // TODO: Implement edit functionality
    console.log('Edit address:', addressId);
  }

  deleteAddress(addressId: string): void {
    // TODO: Implement delete functionality with API call
    this.addressService.deleteAddress(addressId).subscribe({
      next: (response) => {
        console.log('Address deleted:', response);
        // Reload addresses after deletion
        this.loadAddresses();
      },
      error: (err) => {
        console.error('Error deleting address:', err);
      },
    });
  }

  goBack(): void {
    // Navigate back to cart
    this.router.navigate(['/cart']);
  }

  proceedToNext(): void {
    if (this.selectedAddressId) {
      // Navigate to shipping with address ID as route parameter
      this.router.navigate(['../shipping', this.selectedAddressId], {
        relativeTo: this.route,
      });
      console.log(
        'Navigating to shipping with address ID:',
        this.selectedAddressId
      );
    }
  }
}
