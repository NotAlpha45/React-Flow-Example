import { Edge, Node } from "reactflow";
import { EdgeStyle1 } from "../assets/styles/graph-style-constants";

export const defaultNodePosition = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: "1",
    data: { label: "input" },
    position: defaultNodePosition,
  },
] as Node[];

export const initialEdges = [
  {
    id: "e12",
    source: "1",
    target: "2",
    animated: true,
    style: EdgeStyle1.edgeLineStyle,
    markerStart: EdgeStyle1.markerStart,
  },
] as Edge[];
