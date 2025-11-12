import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  order:number = 1;
  verifyEmailLoading: boolean = false;
  verifyCodeLoading: boolean = false;
  resetPasswordLoading: boolean = false;


  verifyEmail:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]) 
  })

   verifyCode:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]) 
  })

  resetPassword:FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  verifyEmailSubmit(): void{

    let emailValue = this.verifyEmail.get('email')?.value;

    this.resetPassword.get('email')?.patchValue(emailValue);

    this.verifyEmailLoading = true;
    this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        if(res.statusMsg == 'success'){
        this.order = 2;
        }
        
      },
      error: (error : HttpErrorResponse) => {
        this.verifyEmailLoading = false;

        console.log(error);
      }
    })

  }

   verifyCodeSubmit(): void{
    this.verifyCodeLoading = true;
    this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        if(res.status == 'Success'){
        this.order = 3;
        }
        
      },
      error: (error : HttpErrorResponse) => {
        this.verifyCodeLoading = false;
        console.log(error);
      }
    })

  }

   resetPasswordSubmit(): void{
    this.resetPasswordLoading = true;
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        this._ToastrService.success('Password has been reset successfully!', 'Cyber')
      setTimeout(() => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      }, 1500);
       
        
      },
      error: (error: HttpErrorResponse) => {
        this.resetPasswordLoading = false;
        console.log(error);
      }
    })

  }
}
