import { ApiService as ApiMockService } from '../../services/api.mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.mock.service';
import { WeatherLocationsQuery } from 'src/app/state/weather-locations/weather-locations.query';
import { WeatherLocationsService } from 'src/app/state/weather-locations/weather-locations.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: HomeComponent;
  let weatherLocationsQuery: WeatherLocationsQuery;
  let weatherLocationsService: WeatherLocationsService;
  let apiService: ApiService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    apiService = new ApiMockService();

    fixture = new HomeComponent(
      weatherLocationsQuery,
      weatherLocationsService,
      apiService,
      snackBar
    );
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      
      fixture.ngOnInit();

      expect(fixture.weatherLocation$.value).toBe(null);

    });
  });

  // describe('ngOnInit', () => {});

  // it('should create', () => {});
});
