import { MarkerType } from "reactflow";

export const DefaultNodeStyle = {
  background: "white",
  border: "4px solid lightblue",
  fonsize: "medium",
};

export const SelectedNodeStyle1 = {
  background: "white",
  border: "4px solid red",
  fonsize: "medium",
  fontWeight: "bold",
};

export const SelectedNodeStyle2 = {
  background: "white",
  border: "4px solid orange",
  fonsize: "medium",
  fontWeight: "bold",
};

export const SelectedNodeStyle3 = {
  background: "white",
  border: "4px solid green",
  fonsize: "medium",
  fontWeight: "bold",
};

export const EdgeStyle1 = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: "#FF0072",
  },
  markerStart: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: "#FF0072",
  },
  style: {
    strokeWidth: 2,
    stroke: "#FF0072",
  },
};
