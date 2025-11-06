import { Component, inject} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errorMsg: string = '';
  msgSuccess: boolean = false;
  isLoading: boolean = false;


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  });

  login(): void {
    if(this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message === 'success') {
            this.msgSuccess = true;
            setTimeout(() => {

              localStorage.setItem('userToken', res.token);

              this._AuthService.saveUserData();


              this._Router.navigate(['/home']);
            }, 1500);
          }
          this.isLoading = false;
        },
        error : (err) => {
          this.errorMsg = err.error.message;
          console.log(err);
          this.isLoading = false;
        }
      })
    }
    else {
      this.loginForm.setErrors({mismatch:true});
      this.loginForm.markAllAsTouched();
    }
  }



}
