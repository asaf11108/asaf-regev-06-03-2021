import { ApiService } from './../app/services/api.service';
import { ApiService as ApiMockService } from "src/app/services/api.mock.service";

export const environment = {
  production: true,
  providers: [
    { provide: ApiMockService, use: ApiService }
  ]
};
