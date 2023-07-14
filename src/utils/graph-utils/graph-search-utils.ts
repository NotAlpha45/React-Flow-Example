import {
  SelectedNodeStyle2,
  SelectedNodeStyle3,
} from "../../assets/styles/graph-style-constants";
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

  static findNodesByOwnershipPercentage(
    percentageValue: number,
    parentNodeId?: string
  ) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const shouldConsiderParentNode = parentNodeId ? true : false;

    const selectedEdges = edges.filter((edge) => {
      if (shouldConsiderParentNode) {
        if (
          edge.data.ownershipPercentage === percentageValue &&
          edge.source === parentNodeId
        ) {
          return edge;
        }
      } else {
        if (edge.data.ownershipPercentage === percentageValue) {
          return edge;
        }
      }
    });

    const selectedNodes = nodes.filter((node) => {
      if (
        selectedEdges.find((edge) => edge.source === node.id) ||
        selectedEdges.find((edge) => edge.target === node.id)
      ) {
        return node;
      }
    });

    GraphLayoutUtils.setBulkSelectedNodeStyles(
      selectedNodes,
      nodes,
      SelectedNodeStyle3
    );

    return selectedNodes;
  }
}
