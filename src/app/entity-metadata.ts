import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
    FavoriteLocation: {

    },
};

const pluralNames = { FavoriteLocation: 'FavoriteLocations' };

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata,
    pluralNames,
};