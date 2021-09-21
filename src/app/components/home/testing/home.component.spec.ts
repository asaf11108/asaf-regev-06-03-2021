import { ApiService as ApiMockService } from '../../../services/api.mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.mock.service';
import { WeatherLocationsQuery } from '../../../state/weather-locations/weather-locations.query';
import { WeatherLocationsService } from '../../../state/weather-locations/weather-locations.service';

import { HomeComponent } from '../home.component';
import {
  blockGeolocation,
  notSupportedGeolocation,
  setCoordsGeolocation,
} from './geolocation.mock';
import { take } from 'rxjs/operators';
import { WeatherLocationsStore } from '../../../state/weather-locations/weather-locations.store';
import { combineLatest, of, pipe } from 'rxjs';

describe('HomeComponent', () => {
  let fixture: HomeComponent;
  let weatherLocationsQuery: WeatherLocationsQuery;
  let weatherLocationsService: WeatherLocationsService;
  let apiService: ApiService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    snackBar = {
      open: jest.fn(),
    } as any;
    let weatherLocationsStore: WeatherLocationsStore = {
      upsert: jest.fn(),
    } as any;

    apiService = new ApiMockService();
    weatherLocationsService = new WeatherLocationsService(
      weatherLocationsStore,
      apiService
    );

    fixture = new HomeComponent(
      weatherLocationsQuery,
      weatherLocationsService,
      apiService,
      snackBar
    );
  });

  describe('ngOnInit', () => {
    describe('getCoordinates', () => {
      const handleGeolocationError = (done) => {
        fixture['getCoordinates']().subscribe(
          () => {
            done.fail(new Error('Should have been failed'));
          },
          () => {
            done.fail(new Error('Should have been failed'));
          },
          () => {
            done();
          }
        );
      };

      it('should block fetch of geolocation', (done) => {
        blockGeolocation();
        handleGeolocationError(done);
      });

      it('should not be supported geolocation', (done) => {
        notSupportedGeolocation();
        handleGeolocationError(done);
      });
    });

    describe('updateSelectedOption', () => {
      it('should not update selected option', (done) => {
        const coordinates = {
          latitude: 0,
          longitude: 0,
        };
        of(coordinates)
          .pipe(fixture['updateSelectedOption']())
          .subscribe(
            () => {
              done.fail(new Error('Should have been failed'));
            },
            () => {
              done.fail(new Error('Should have been failed'));
            },
            () => {
              done();
            }
          );
      });
    });

    it('should update selected option and weather location', (done) => {
      combineLatest([
        fixture.selectedOption$.pipe(take(1)),
        fixture.weatherLocation$.pipe(take(1)),
      ]).subscribe((res) => {
        expect(res[1].key).not.toBeNull();
        done();
      });

      const coordinates = {
        latitude: 32.985,
        longitude: 35.251,
      };
      setCoordsGeolocation(coordinates);

      fixture.ngOnInit();
    });
  });

  describe('onSelectionChange', () => {
    it('should update weather location', (done) => {
      fixture.weatherLocation$.pipe(take(1)).subscribe((res) => {
        expect(res.key).not.toBeNull();
        done();
      });

      const location = {
        key: '214356',
        localizedName: 'Yanuh',
      };

      fixture.onSelectionChange(location);
    });
  });
});
