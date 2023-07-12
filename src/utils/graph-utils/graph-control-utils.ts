import { NodeChange } from "reactflow";
import { appStore } from "../../stores/redux-store";
import { GraphSliceActions } from "../../stores/slices/graph-slice";

export class GraphControlUtils {
  static handleNodeMove(changes: NodeChange[]) {
    appStore.dispatch(GraphSliceActions.onNodesChange(changes));
  }
}
