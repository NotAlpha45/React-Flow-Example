import { SelectedNodeStyle3 } from "../../assets/styles/graph-style-constants";
import { GraphFilterNames } from "../../enums/graph-filter-type-enums";
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

  static findNodesByPercentage(
    percentageValue: number,
    matchType: GraphFilterNames,
    parentNodeId?: string
  ): Node[] {
    switch (matchType) {
      case GraphFilterNames.PERCENTAGE_EQUALS:
        return this.findNodesEqualsToPercentage(percentageValue, parentNodeId);
      case GraphFilterNames.PERCENTAGE_NOT_EQUALS:
        return this.findNodesNotEqualsToPercentage(
          percentageValue,
          parentNodeId
        );
      case GraphFilterNames.PERCENTAGE_GREATER_THAN:
        return this.findNodesGreaterThanPercentage(
          percentageValue,
          parentNodeId
        );
      case GraphFilterNames.PERCENTAGE_LESS_THAN:
        return this.findNodesLessThanPercentage(percentageValue, parentNodeId);
      default:
        return [];
    }
  }

  static findNodesEqualsToPercentage(
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

  static findNodesNotEqualsToPercentage(
    percentageValue: number,
    parentNodeId?: string
  ) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const shouldConsiderParentNode = parentNodeId ? true : false;

    const selectedEdges = edges.filter((edge) => {
      if (shouldConsiderParentNode) {
        if (
          edge.data.ownershipPercentage !== percentageValue &&
          edge.source === parentNodeId
        ) {
          return edge;
        }
      } else {
        if (edge.data.ownershipPercentage !== percentageValue) {
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

  static findNodesGreaterThanPercentage(
    percentageValue: number,
    parentNodeId?: string
  ) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const shouldConsiderParentNode = parentNodeId ? true : false;

    const selectedEdges = edges.filter((edge) => {
      if (shouldConsiderParentNode) {
        if (
          edge.data.ownershipPercentage > percentageValue &&
          edge.source === parentNodeId
        ) {
          return edge;
        }
      } else {
        if (edge.data.ownershipPercentage > percentageValue) {
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

  static findNodesLessThanPercentage(
    percentageValue: number,
    parentNodeId?: string
  ) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const shouldConsiderParentNode = parentNodeId ? true : false;

    const selectedEdges = edges.filter((edge) => {
      if (shouldConsiderParentNode) {
        if (
          edge.data.ownershipPercentage < percentageValue &&
          edge.source === parentNodeId
        ) {
          return edge;
        }
      } else {
        if (edge.data.ownershipPercentage < percentageValue) {
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

  static findNodesBetweenPercentage(
    percentageValue1: number,
    percentageValue2: number,
    parentNodeId?: string
  ) {
    const edges = appStore.getState().graph.edges;
    const nodes = appStore.getState().graph.nodes;

    const shouldConsiderParentNode = parentNodeId ? true : false;

    const selectedEdges = edges.filter((edge) => {
      if (shouldConsiderParentNode) {
        if (
          edge.data.ownershipPercentage > percentageValue1 &&
          edge.data.ownershipPercentage < percentageValue2 &&
          edge.source === parentNodeId
        ) {
          return edge;
        }
      } else {
        if (
          edge.data.ownershipPercentage > percentageValue1 &&
          edge.data.ownershipPercentage < percentageValue2
        ) {
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
