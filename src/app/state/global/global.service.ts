import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GlobalStore } from './global.store';

@Injectable({ providedIn: 'root' })
export class GlobalService {

  constructor(private globalStore: GlobalStore) {
  }


}
