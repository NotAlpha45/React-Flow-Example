import { HierarchyPointNode, stratify, tree } from "d3-hierarchy";
import { Node, Edge, Position } from "reactflow";
import Dagre from "@dagrejs/dagre";
import {
  DefaultNodeStyle,
  SelectedNodeStyle1,
} from "../../assets/styles/graph-style-constants";
import { appStore } from "../../stores/redux-store";
import { GraphSliceActions } from "../../stores/slices/graph-slice";

export class GraphLayoutUtils {
  static setDefaultNodeStyle(
    nodes: Node[] = appStore.getState().graph.nodes,
    style: {} = DefaultNodeStyle
  ) {
    const newNodes = nodes.map((node: Node) => {
      return {
        ...node,
        style: style,
      };
    });

    appStore.dispatch(GraphSliceActions.setNodes(newNodes));
  }

  static setSelectedNodeStyle(
    nodeId: string,
    nodes: Node[] = appStore.getState().graph.nodes,
    style: {} = SelectedNodeStyle1
  ) {
    const newNodes = nodes.map((node: Node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          style: style,
        };
      }

      return node;
    });

    appStore.dispatch(GraphSliceActions.setNodes(newNodes));
  }

  static setBulkSelectedNodeStyles(
    selectedNodes: Node[],
    nodes: Node[] = appStore.getState().graph.nodes,
    style: {} = SelectedNodeStyle1
  ) {
    const newNodes = nodes.map((node: Node) => {
      if (selectedNodes.find((selectedNode) => selectedNode.id === node.id)) {
        return {
          ...node,
          style: style,
        };
      }

      return node;
    });

    appStore.dispatch(GraphSliceActions.updateNodes(newNodes));
  }

  static d3LayoutMaker(nodes: Node[], edges: Edge[]) {
    const graphLayout = tree();

    if (nodes.length === 0) return { nodes, edges };

    const { width, height } = document
      ?.querySelector(`[data-id="${nodes[0].id}"]`)
      ?.getBoundingClientRect() ?? { width: 0, height: 0 };

    const hierarchy = stratify()
      .id((node: any) => node.id)
      .parentId(
        (node: any) =>
          edges.find((edge: any) => edge.target === node.id)?.source
      );

    const root = hierarchy(nodes);

    const layout = graphLayout.nodeSize([width * 2, height * 2])(root);

    return {
      nodes: layout.descendants().map((node: HierarchyPointNode<any>) => ({
        ...node.data,
        position: { x: node.x, y: node.y },
      })),
      edges,
    };
  }

  static dagreeLayoutMaker(
    nodes: Node[],
    edges: Edge[],
    options: { rankdir: "LR" | "TB" }
  ): { nodes: Node[]; edges: Edge[] } {
    const isHorizontal = options.rankdir === "LR";

    const graphLayout = new Dagre.graphlib.Graph();

    graphLayout.setGraph(options);

    // You need to set default node and edges for dagre, otherwise it may result in unexpected behaviour
    graphLayout.setDefaultEdgeLabel(() => ({}));
    graphLayout.setDefaultNodeLabel(() => ({}));

    edges.forEach((edge) => graphLayout.setEdge(edge?.source, edge?.target));
    nodes.forEach((node) => graphLayout.setNode(node?.id, {})); // Pass an empty object so that it is used to make the nodes

    Dagre.layout(graphLayout);

    const repositionedNodes = nodes.map((node: Node) => {
      const repositionedNode = graphLayout.node(node.id);

      const nodeSourcePosition = isHorizontal
        ? Position.Right
        : Position.Bottom;

      const nodeTargetPosition = isHorizontal ? Position.Left : Position.Top;

      // This will automatically move the connecting point position according to the layout direction
      node = {
        ...node,
        sourcePosition: nodeSourcePosition,
        targetPosition: nodeTargetPosition,
      };

      return {
        ...node,
        position: {
          x: repositionedNode.x * 5,
          y: repositionedNode.y * 2,
        },
      };
    });

    return {
      nodes: repositionedNodes,
      edges,
    };
  }
}
