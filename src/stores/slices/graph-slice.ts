import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Node,
  Edge,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
} from "reactflow";
import { initialEdges, initialNodes } from "../../dummy-data/nodes-edges";

export interface GraphStateType {
  nodes: Node[];
  edges: Edge[];
}

const initialGraphState: GraphStateType = {
  nodes: initialNodes ?? [],
  edges: initialEdges ?? [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState: initialGraphState,
  reducers: {
    addConnection: (
      state: GraphStateType,
      action: PayloadAction<{ node: Node; edge: Edge }>
    ) => {
      state.nodes = [...state.nodes, action.payload.node];
      state.edges = [...state.edges, action.payload.edge];
    },

    addNewBulkConnections: (
      state: GraphStateType,
      action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>
    ) => {
      state.nodes = [...action.payload.nodes];
      state.edges = [...action.payload.edges];
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

    setNodesAndEdges(
      state: GraphStateType,
      action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>
    ) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },

    onNodesChange: (
      state: GraphStateType,
      action: PayloadAction<NodeChange[]>
    ) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
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
