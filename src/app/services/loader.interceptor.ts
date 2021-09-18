import { WeatherLocationsStore } from './../state/weather-locations/weather-locations.store';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(private weatherLocationsStore: WeatherLocationsStore) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pendingRequests++;
    this.weatherLocationsStore.setLoading(true);

    return next.handle(req).pipe(
        finalize(() => {
            this.pendingRequests--;
            !this.pendingRequests && this.weatherLocationsStore.setLoading(false);
        })
    );
  }
}
