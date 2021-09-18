import { WeatherLocation } from './../../state/weather-locations/weather-location.model';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { displayedColumns } from './table.config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-table mat-elevation-z8'
  }
})
export class TableComponent {
  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  @Input() columns: string[] = [];
  @Input() set data(data: WeatherLocation[]) {
    this.dataSource.data = data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
