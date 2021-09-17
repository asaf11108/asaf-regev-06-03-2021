import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ApiInterceptor } from './services/api.interceptor';
import { TemperaturePipe } from './pipes/temperature.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AutocompleteComponent,
    TemperaturePipe,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    ...environment.providers,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
