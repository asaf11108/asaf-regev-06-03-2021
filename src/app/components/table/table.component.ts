import { omit } from 'lodash-es';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TableColumn, ColumnType, _TableColumn } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-table mat-elevation-z8',
  },
})
export class TableComponent<T> {
  displayedColumns: string[] = [];
  columns: _TableColumn[] = [];
  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('coordinates', { static: true }) coordinatesRef: TemplateRef<any>;
  @ViewChild('temperature', { static: true }) temperatureRef: TemplateRef<any>;
  @ViewChild('text', { static: true }) textRef: TemplateRef<any>;

  @Input('columns') set _columns(columns: TableColumn[]) {
    this.displayedColumns = this.buildDisplayedColumns(columns);
    this.columns = this.buildColumns(columns);
  }
  @Input() set rows(rows: T[]) {
    this.dataSource.data = rows;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private buildDisplayedColumns(columns: TableColumn[]): string[] {
    return columns.map((col) => col.name);
  }

  private buildColumns(columns: TableColumn[]): _TableColumn[] {
    return columns.map((col) => {
      let cellTemplate: TemplateRef<any>;
      switch (col.type) {
        case ColumnType.Coordinates:
          cellTemplate = this.coordinatesRef;
          break;
        case ColumnType.Temperature:
          cellTemplate = this.temperatureRef;
          break;
        case ColumnType.Text:
          cellTemplate = this.textRef;
          break;
      }
      return {
        ...omit(col, 'type'),
        cellTemplate,
      };
    });
  }
}

