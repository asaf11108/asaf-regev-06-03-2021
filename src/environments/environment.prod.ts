import { ApiService } from './../app/services/api.service';
import { ApiService as ApiMockService } from "src/app/services/api.mock.service";
import { Provider } from '@angular/core';

export const environment = {
  production: true,
  providers: [
    { provide: ApiMockService, useExisting: ApiService }
  ] as Provider[]
};
