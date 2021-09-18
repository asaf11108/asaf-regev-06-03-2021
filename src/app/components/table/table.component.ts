import { WeatherLocation } from './../../state/weather-locations/weather-location.model';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  @Input() displayedColumns: string[] = [];
  @Input() set data(data: WeatherLocation[]) {
    this.dataSource.data = data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
