import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eCommerceProject';
}
