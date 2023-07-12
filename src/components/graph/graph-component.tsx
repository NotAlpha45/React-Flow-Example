import { useEffect, useMemo } from 'react'
import ReactFlow, { Controls, useReactFlow, Node, Edge, useNodesState, useEdgesState, Background, Panel, BackgroundVariant, NodeChange } from 'reactflow'
// import { initialEdges, initialNodes } from '../../stores/slices/nodes-edges';
import 'reactflow/dist/style.css';
import { useAppSelector } from '../../stores/redux-store';
import { shallowEqual, useDispatch } from 'react-redux';
import { GraphSliceActions } from '../../stores/slices/graph-slice';
import NodeComponent from '../node/node-component';

interface GraphComponentProps {

    layoutFunction: (nodes: Node[], edges: Edge[], options: {
        rankdir: string;
    }) => {
        nodes: Node[];
        edges: Edge[];
    }
}



export default function GraphComponent(props: GraphComponentProps) {

    const nodes = useAppSelector(state => state.graph.nodes, shallowEqual);
    const edges = useAppSelector(state => state.graph.edges, shallowEqual);
    const reactFlowInstance = useReactFlow();
    const dispatch = useDispatch();

    const renderNodeObject = useMemo(() => (
        { renderNode: NodeComponent }
    ), []);


    const dummyNode: Node = {
        id: '69',
        data: { label: 'dummy', color: '#4FD1C5' },
        position: { x: 0, y: 0 },
    }

    const dummyEdge: Edge = {
        id: '169',
        source: '2',
        target: '69',
        animated: true,
    }

    const setLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = props.layoutFunction(nodes, edges, { rankdir: 'LR' });

        dispatch(GraphSliceActions.setNodes(layoutedNodes));
        dispatch(GraphSliceActions.setEdges(layoutedEdges));

        window.requestAnimationFrame(() => {
            reactFlowInstance.fitView();
        });

    }

    const addConnection = (node: Node, edge: Edge) => {
        dispatch(GraphSliceActions.addConnection({ node, edge }));

    }

    const handleNodeMovement = (changes: NodeChange[]) => {

        dispatch(GraphSliceActions.onNodesChange(changes));
    }


    useEffect(() => {
        setLayout();
    }, [reactFlowInstance])


    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodeMovement}
                    fitView
                    nodeTypes={renderNodeObject}
                >
                    <Panel position="top-right">
                        <button type='button' onClick={setLayout}>Reset Layout</button>
                        <button type='button' onClick={() => { addConnection(dummyNode, dummyEdge) }}>Add Connection</button>
                    </Panel>
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </div>
        </>
    )

}
