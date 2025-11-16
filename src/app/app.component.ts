import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { PwaService } from './core/services/pwa.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'eCommerceProject';

  // Initialize PWA service to enable update checks and install prompt
  private readonly _PwaService = inject(PwaService);
  private readonly _AuthService = inject(AuthService);

  ngOnInit(): void {
    // Load user data from localStorage if token exists
    this._AuthService.saveUserData();
  }
}
