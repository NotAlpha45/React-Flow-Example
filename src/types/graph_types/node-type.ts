import { Node, Edge } from "reactflow";

type NodeData = {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
};

type EdgeData = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};

export type NodeType = Node<NodeData>;
export type EdgeType = Edge<EdgeData>;
