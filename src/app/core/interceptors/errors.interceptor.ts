import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService = inject(ToastrService);


  return next(req).pipe(catchError (

    (error) => {

      console.log('Error Interceptor Caught an Error: ', error.error.message);

      _ToastrService.error(error.error.message, 'Cyber')


      return throwError(() => error);
    }

  ))


};
