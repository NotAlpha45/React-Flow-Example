import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Node,
  Edge,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  OnNodesChange,
} from "reactflow";
import { initialEdges, initialNodes } from "./nodes-edges";

export interface GraphStateType {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: OnNodesChange;
}

type GraphActionType = {
  type: string;
  payload: {
    node: Node;
    edge: Edge;
  };
};

const initialGraphState: GraphStateType = {
  nodes: initialNodes ?? [],
  edges: initialEdges ?? [],
  onNodesChange: function (changes: NodeChange[]) {
    console.log("onNodesChange", changes);

    this.nodes = applyNodeChanges(changes, this.nodes);
  },
};

const graphSlice = createSlice({
  name: "graph",
  initialState: initialGraphState,
  reducers: {
    addConnection: (state: GraphStateType, action: GraphActionType) => {
      state = {
        ...state,
        nodes: [...state.nodes, action.payload.node],
        edges: [...state.edges, action.payload.edge],
      };
    },

    addNodes: (state: GraphStateType, action: PayloadAction<Node[]>) => {
      state.nodes = [...state.nodes, ...action.payload];
    },

    addEdges: (state: GraphStateType, action: PayloadAction<Edge[]>) => {
      state.edges = [...state.edges, ...action.payload];
    },

    setNodes(state: GraphStateType, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },

    setEdges(state: GraphStateType, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },

    onEdgesChange: (
      state: GraphStateType,
      action: PayloadAction<EdgeChange[]>
    ) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
  },
});

export const GraphReducer = graphSlice.reducer;
export const GraphSliceActions = graphSlice.actions;
