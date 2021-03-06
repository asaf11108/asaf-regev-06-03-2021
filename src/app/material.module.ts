import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const components = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
];

@NgModule({
  imports: components,
  exports: components,
  providers: [],
})
export class MaterialModule { }
