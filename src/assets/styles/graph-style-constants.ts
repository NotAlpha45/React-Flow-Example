import { MarkerType } from "reactflow";

export const DefaultNodeStyle = {
  background: "white",
  border: "4px solid teal",
  fonsize: "medium",
  width: "fit-content",
};

export const SelectedNodeStyle1 = {
  background: "white",
  border: "4px solid red",
  fonsize: "medium",
  fontWeight: "bold",
  width: "fit-content",
};

export const SelectedNodeStyle2 = {
  background: "white",
  border: "4px solid orange",
  fonsize: "medium",
  fontWeight: "bold",
  width: "fit-content",
};

export const SelectedNodeStyle3 = {
  background: "white",
  border: "4px solid yellow",
  fonsize: "medium",
  fontWeight: "bold",
  width: "fit-content",
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
  edgeLineStyle: {
    strokeWidth: 2,
    stroke: "#FF0072",
  },
};

export const SelectedEdgeStyle1 = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: "#E1F714",
  },
  markerStart: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: "#E1F714",
  },
  edgeLineStyle: {
    strokeWidth: 2,
    stroke: "#E1F714",
  },
};
