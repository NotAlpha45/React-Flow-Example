import { appStore } from "../../stores/redux-store";
import { GraphFilterSliceActions } from "../../stores/slices/graph-filter-slice";
import { GraphFilterType } from "../../types/graph-saved-filter-types";

export class GraphFilterUtils {
  static saveFilter(filter: GraphFilterType) {
    console.log("Saving filter: ", filter);
    appStore.dispatch(GraphFilterSliceActions.addGraphFilter(filter));
  }
}
