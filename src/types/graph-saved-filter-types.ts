import { GraphFilterNames } from "../enums/graph-filter-type-enums";

export type GraphFilterType = {
  entityId: string;
  entityName: string;
  filterType: GraphFilterNames;
  sharePercentage: number;
};
