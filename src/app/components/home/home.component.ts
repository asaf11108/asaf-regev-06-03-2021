import { ApiService } from './../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, concat, of } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly FILTER_INITIAL_VALUE = 'Tel Aviv';
  myControl = new FormControl(this.FILTER_INITIAL_VALUE, [Validators.required, Validators.pattern(/[a-zA-Z]*/)]);
  filteredOptions: Observable<string[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.filteredOptions = concat(
      of(this.FILTER_INITIAL_VALUE),
      this.myControl.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => location.LocalizedName))
    );
  }

}
