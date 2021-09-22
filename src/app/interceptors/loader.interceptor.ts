import { WeatherLocationsStore } from '../state/weather-locations/weather-locations.store';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


const LOADER = new HttpContextToken<boolean>(() => true);

export function skipLoader() {
    return new HttpContext().set(LOADER, false);
  }

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(private weatherLocationsStore: WeatherLocationsStore) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLoader = req.context.get(LOADER)
    if (isLoader) {
        this.pendingRequests++;
        this.weatherLocationsStore.setLoading(true);
    }

    return next.handle(req).pipe(
        finalize(() => {
            if (isLoader) {
                this.pendingRequests--;
                !this.pendingRequests && this.weatherLocationsStore.setLoading(false);
            }
        })
    );
  }
}
