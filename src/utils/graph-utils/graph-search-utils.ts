import { SelectedNodeStyle2 } from "../../stores/constants/graph-style-constants";
import { appStore } from "../../stores/redux-store";
import { GraphLayoutUtils } from "./graph-layout-utils";
import { Node } from "reactflow";

export class GraphSearchUtils {
  static findNodeById(nodeId: string): Node | undefined {
    const nodes = appStore.getState().graph.nodes;
    GraphLayoutUtils.setSelectedNodeStyle(nodeId, nodes);
    const node = nodes.find((node) => node.id === nodeId);
    return node;
  }

  static findNodeByLabel(nodeLabel: string, matchType: "equals" | "contains") {
    const nodes = appStore.getState().graph.nodes;
    const selectedNodes = nodes.filter((node) => {
      if (matchType === "equals") {
        return node.data.label === nodeLabel;
      }
      return node.data.label.includes(nodeLabel);
    });

    GraphLayoutUtils.setBulkSelectedNodeStyles(selectedNodes, nodes);

    return selectedNodes;
  }

  static findChildNodes(parentNodeId: string) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const childNodeIds = edges.map((edge) => {
      if (edge.source === parentNodeId) {
        return edge.target;
      }
    });

    const childNodes = nodes.filter((node) => {
      if (childNodeIds.includes(node.id)) {
        return node;
      }
    });

    GraphLayoutUtils.setBulkSelectedNodeStyles(
      childNodes,
      nodes,
      SelectedNodeStyle2
    );

    return childNodes;
  }
}
