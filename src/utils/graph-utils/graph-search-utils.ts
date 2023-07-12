import { appStore } from "../../stores/redux-store";
import { GraphLayoutUtils } from "./graph-layout-utils";
import { Node } from "reactflow";

export class GraphSearchUtils {
  static findNodeById(nodeId: string): Node | undefined {
    const nodes = appStore.getState().graph.nodes;
    GraphLayoutUtils.setSelectedNodeColor(nodeId, nodes);
    const node = nodes.find((node) => node.id === nodeId);
    return node;
  }

  static findNodeByLabel(nodeLabel: string, matchType: "strict" | "contains") {
    const nodes = appStore.getState().graph.nodes;
    const selectedNodes = nodes.filter((node) => {
      if (matchType === "strict") {
        return node.data.label === nodeLabel;
      }
      return node.data.label.includes(nodeLabel);
    });

    console.log("selectedNodes", selectedNodes);

    GraphLayoutUtils.setBulkSelectedNodeColors(selectedNodes, nodes);

    return selectedNodes;
  }
}
