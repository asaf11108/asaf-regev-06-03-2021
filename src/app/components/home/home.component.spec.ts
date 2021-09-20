import { ApiService as ApiMockService } from '../../services/api.mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.mock.service';
import { WeatherLocationsQuery } from '../../state/weather-locations/weather-locations.query';
import { WeatherLocationsService } from '../../state/weather-locations/weather-locations.service';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import {
  blockGeolocation,
  notSupportedGeolocation,
  setCoordsGeolocation,
} from '../../testing/geolocation.mock';
import { not } from '@angular/compiler/src/output/output_ast';

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

    apiService = new ApiMockService();

    fixture = new HomeComponent(
      weatherLocationsQuery,
      weatherLocationsService,
      apiService,
      snackBar
    );
  });

  describe('ngOnInit', () => {
    describe('getCoordinates', () => {
      it('should fetch coordinates', (done) => {
        const ans = {
          latitude: 51.1,
          longitude: 45.3,
        };
        setCoordsGeolocation(ans);
        fixture['getCoordinates']().subscribe((res) => {
          expect(res).toEqual(ans);
          done();
        });
      });

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

    
  });

  // describe('ngOnInit', () => {});

  // it('should create', () => {});
});
