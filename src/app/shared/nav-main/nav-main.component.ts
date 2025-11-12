import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PwaService } from '../../core/services/pwa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css',
})
export class NavMainComponent {
  readonly _AuthService = inject(AuthService);
  readonly _PwaService = inject(PwaService);

  installPwa(): void {
    this._PwaService.installPwa();
  }
}
