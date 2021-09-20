import { ColumnType, TableColumn } from "../table/table.model";

export const FILTER_BY_COLUMN = 'localizedName';

export const COLUMNS: TableColumn[] = [
    { prop: 'key', name: 'ID', type: ColumnType.Text },
    { prop: 'localizedName', name: 'Name', type: ColumnType.Text },
    { prop: 'coordinates', name: 'Coordinates', type: ColumnType.Coordinates },
    { prop: 'temperature', name: 'Temperature', type: ColumnType.Temperature },
];