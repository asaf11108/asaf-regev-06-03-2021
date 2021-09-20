import { TemplateRef } from "@angular/core";

export enum ColumnType {
    Text,
    Coordinates,
    Temperature
}

export interface TableColumn {
    prop: string;
    name: string;
    type: ColumnType;
}

export interface _TableColumn extends Omit<TableColumn, 'type'> {
    cellTemplate: TemplateRef<any>;
}