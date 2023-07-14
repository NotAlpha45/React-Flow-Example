import { useEffect, useState } from 'react'
import ReactFlow, { Controls, useReactFlow, Background, Panel, BackgroundVariant } from 'reactflow'
import 'reactflow/dist/style.css';
import { useAppSelector } from '../../stores/redux-store';
import { shallowEqual, useDispatch } from 'react-redux';
import { GraphSliceActions } from '../../stores/slices/graph-slice';
import { GraphLayoutUtils } from '../../utils/graph-utils/graph-layout-utils';
import { GraphControlUtils } from '../../utils/graph-utils/graph-control-utils';
import { GraphSearchUtils } from '../../utils/graph-utils/graph-search-utils';
import { EntityConverter } from '../../utils/entity-utils/entity-conversion-util';
import { customEdgeObject } from '../node-edge/custom-edge-object';


export default function GraphComponent() {

    const nodes = useAppSelector(state => state.graph.nodes, shallowEqual);
    const edges = useAppSelector(state => state.graph.edges, shallowEqual);
    const reactFlowInstance = useReactFlow();
    const [selectedLayout, setSelectedLayout] = useState<"LR" | "TB">("TB")
    const dispatch = useDispatch();

    const setLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = GraphLayoutUtils.dagreeLayoutMaker(nodes, edges, { rankdir: selectedLayout });

        dispatch(GraphSliceActions.setNodes(layoutedNodes));
        dispatch(GraphSliceActions.setEdges(layoutedEdges));

        window.requestAnimationFrame(() => {
            reactFlowInstance.fitView();
        });

    }

    useEffect(() => {

        EntityConverter.convertEntitiesToGraph();
        setLayout();
        GraphLayoutUtils.setDefaultNodeStyle();
    }, [selectedLayout, reactFlowInstance])




    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                edgeTypes={customEdgeObject}
                onNodesChange={GraphControlUtils.handleNodeMove}
                fitView
            >
                <Panel position="top-right" className='bg-gray-500 rounded-md'>
                    <button type='button' className='bg-white text-black m-2 border-black border-4' onClick={() => { setSelectedLayout("TB") }}>Vertical Layout</button>
                    <button type='button' className='bg-white text-black m-2 border-black border-4' onClick={() => { setSelectedLayout("LR") }}>Horizontal Layout</button>
                    <button type='button' className='bg-white text-black m-2 border-black border-4' onClick={() => { setLayout() }}>Reset Layout</button>
                    <button type='button' className='bg-white text-black m-2 border-black border-4' onClick={() => { GraphLayoutUtils.setDefaultNodeStyle() }}>Reset Selection</button>
                    <button type='button' className='bg-white text-black m-2 border-yellow-300 border-4' onClick={() => { GraphSearchUtils.findNodesByOwnershipPercentage(50, "3"); }}>Select Nodes With 50% Ownership</button>
                    <button type='button' className='bg-white text-black m-2 border-red-700 border-4' onClick={() => { GraphSearchUtils.findNodeByLabel("2", "contains") }}>Select Nodes Containing "2"</button>
                </Panel>
                <Controls className='bg-white text-black p-1 rounded-md' />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>

        </>
    )

}
