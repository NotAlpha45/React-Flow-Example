import { Node, Edge } from "reactflow";

export interface NodeDataType extends Node {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export type EdgeDataType = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
} & Edge;
