import { ApiService as ApiMockService } from 'src/app/services/api.mock.service';
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
    console.log(
      '🚀 ~ file: home.component.spec.ts ~ line 29 ~ describe ~ fixture',
      fixture
    );
  });

  describe('ngOnInit', () => {
    console.log(fixture.weatherLocation$.value);
  });

  describe('ngOnInit', () => {});

  it('should create', () => {});
});
