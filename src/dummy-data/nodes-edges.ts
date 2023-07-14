import { Edge, MarkerType, Node } from "reactflow";
import { EdgeStyle1 } from "../styles/graph-style-constants";

const defaultPosition = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: "1",
    data: { label: "input" },
    position: defaultPosition,
  },
  {
    id: "2",
    data: { label: "node 2" },
    position: defaultPosition,
  },
  {
    id: "2a",
    data: { label: "node 2a" },
    position: defaultPosition,
  },
  {
    id: "2b",
    data: { label: "node 2b" },
    position: defaultPosition,
  },
  {
    id: "2c",
    data: { label: "node 2c" },
    position: defaultPosition,
  },
  {
    id: "2d",
    data: { label: "node 2d" },
    position: defaultPosition,
  },
  {
    id: "3",
    data: { label: "node 3" },
    position: defaultPosition,
  },

  {
    id: "3a",
    data: { label: "node 3a" },
    position: defaultPosition,
  },

  {
    id: "3b",
    data: { label: "node 3b" },
    position: defaultPosition,
  },
  {
    id: "3c",
    data: { label: "node 3c" },
    position: defaultPosition,
  },
] as Node[];

export const initialEdges = [
  {
    id: "e12",
    source: "1",
    target: "2",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "e13",
    source: "1",
    target: "3",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "e22a",
    source: "2",
    target: "2a",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "e22b",
    source: "2",
    target: "2b",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "e22c",
    label: "edge 2 to 2c",
    source: "2",
    target: "2c",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "e2c2d",
    source: "2c",
    target: "2d",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },

  {
    id: "33a",
    source: "3",
    target: "3a",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "33b",
    source: "3",
    target: "3b",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  {
    id: "33c",
    source: "3",
    target: "3c",
    animated: true,
    style: EdgeStyle1.style,
    markerStart: EdgeStyle1.markerStart,
  },
  // { id: "13a", source: "3a", target: "2", animated: true },
] as Edge[];
