import { useEffect } from 'react'
import ReactFlow, { Controls, useReactFlow, Node, Edge, Background, Panel, BackgroundVariant } from 'reactflow'
import 'reactflow/dist/style.css';
import { useAppSelector } from '../../stores/redux-store';
import { shallowEqual, useDispatch } from 'react-redux';
import { GraphSliceActions } from '../../stores/slices/graph-slice';
import { GraphLayoutUtils } from '../../utils/graph-utils/graph-layout-utils';
import { GraphControlUtils } from '../../utils/graph-utils/graph-control-utils';
import { GraphSearchUtils } from '../../utils/graph-utils/graph-search-utils';

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

    const setLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = props.layoutFunction(nodes, edges, { rankdir: 'LR' });

        dispatch(GraphSliceActions.setNodes(layoutedNodes));
        dispatch(GraphSliceActions.setEdges(layoutedEdges));

        window.requestAnimationFrame(() => {
            reactFlowInstance.fitView();
        });

    }

    useEffect(() => {
        setLayout();
        GraphLayoutUtils.setDefaultNodeStyle();
    }, [reactFlowInstance])


    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={GraphControlUtils.handleNodeMove}
                    fitView
                >
                    <Panel position="top-right" className='bg-gray-500 rounded-md'>
                        <button type='button' className='bg-white text-black m-2' onClick={() => { setLayout() }}>Reset Layout</button>
                        <button type='button' className='bg-white text-black m-2' onClick={() => { GraphLayoutUtils.setDefaultNodeStyle() }}>Reset Selection</button>
                        <button type='button' className='bg-white text-black m-2' onClick={() => { GraphSearchUtils.findChildNodes("2") }}>Select Child Nodes of 2</button>
                        <button type='button' className='bg-white text-black m-2' onClick={() => { GraphSearchUtils.findNodeByLabel("2", "contains") }}>Select Nodes Containing "2"</button>
                    </Panel>
                    <Controls className='bg-white text-black p-1 rounded-md' />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </div>
        </>
    )

}
