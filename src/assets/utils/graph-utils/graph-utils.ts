import { HierarchyPointNode, stratify, tree } from "d3-hierarchy";
import { Node, Edge } from "reactflow";
import Dagree from "@dagrejs/dagre";

export class GraphUtils {
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
    options: { rankdir: string }
  ): { nodes: Node[]; edges: Edge[] } {
    const graphLayout = new Dagree.graphlib.Graph();

    graphLayout.setGraph(options);

    edges.forEach((edge) => graphLayout.setEdge(edge?.source, edge?.target));
    nodes.forEach((node) => graphLayout.setNode(node?.id, node));

    Dagree.layout(graphLayout);

    const repositionedNodes = nodes.map((node: Node) => {
      const dagreeNode = graphLayout.node(node.id);

      return {
        ...node,
        position: { x: dagreeNode.x, y: dagreeNode.y },
      };
    });

    return {
      nodes: repositionedNodes,
      edges,
    };
  }
}
