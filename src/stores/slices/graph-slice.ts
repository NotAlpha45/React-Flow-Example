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
import { initialEdges, initialNodes } from "../../dummy-data/nodes-edges";

export interface GraphStateType {
  nodes: Node[];
  edges: Edge[];
}

type GraphActionType = {
  type?: string;
  payload: {
    node: Node;
    edge: Edge;
  };
};

const initialGraphState: GraphStateType = {
  nodes: initialNodes ?? [],
  edges: initialEdges ?? [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState: initialGraphState,
  reducers: {
    addConnection: (state: GraphStateType, action: GraphActionType) => {
      state.nodes = [...state.nodes, action.payload.node];
      state.edges = [...state.edges, action.payload.edge];
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

    updateNodes(state: GraphStateType, action: PayloadAction<Node[]>) {
      const newNodes = state.nodes.map((node) => {
        const updatedNode = action.payload.find(
          (updatedNode) => updatedNode.id === node.id
        );

        if (updatedNode) {
          node = updatedNode;
        }

        return node;
      });

      state.nodes = newNodes;
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
