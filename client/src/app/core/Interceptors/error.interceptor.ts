import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toaster: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throwError(error.error);
            } else {
              this.toaster.error(error.error.message, error.error.statusCode);
            }
          } else if (error.status === 401) {
              this.toaster.error(error.error.message, error.error.statusCode);
          } else if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          } else if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }

        return throwError(error);
      })
    );
  }
}
