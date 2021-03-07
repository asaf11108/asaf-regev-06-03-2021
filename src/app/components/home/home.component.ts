import { ApiService } from './../../services/api.mock.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, concat, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { Location } from "../../model/location";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly FILTER_INITIAL_VALUE = 'Tel Aviv';
  myControl = new FormControl(this.FILTER_INITIAL_VALUE, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);
  filteredOptions: Observable<Location[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.filteredOptions = concat(
      of(this.FILTER_INITIAL_VALUE),
      this.myControl.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => !this.myControl.invalid)
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => ({ Key: location.Key, LocalizedName: location.LocalizedName })))
    );
  }

}
