import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly API_KEY = 'gRf4KNnswLuVm8mG3puAI1GUOGeJTu1v';
  private readonly ENDPOINT = 'https://dataservice.accuweather.com/';
  private readonly BAD_REQUEST = ' Unable to retrieve data. Switched to mock data.';


  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone({
      url: `${this.ENDPOINT}${req.url}`,
      params: req.params.append('apikey', this.API_KEY)
    });
    return next.handle(reqClone).pipe(
      catchError(error => {
        this.snackBar.open(this.BAD_REQUEST, '', { duration: 5000 });
        return throwError(error);
      })
    );
  }
}
