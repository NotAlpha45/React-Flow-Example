import { tree } from 'd3-hierarchy'
import React, { useCallback, useEffect } from 'react'
import ReactFlow, { Controls, MiniMap, NodeChange, ReactFlowProps, useReactFlow, Node, Edge, useNodesState, useEdgesState, Background, Panel, BackgroundVariant } from 'reactflow'
import { initialEdges, initialNodes } from '../../stores/nodes-edges';
import 'reactflow/dist/style.css';

interface GraphComponentProps {

    layoutFunction: (nodes: Node[], edges: Edge[], options: {
        direction: any;
    }) => {
        nodes: Node[];
        edges: Edge[];
    }
}

export default function GraphComponent(props: GraphComponentProps) {


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const reactFlowInstance = useReactFlow();

    const setLayout = useCallback(
        (direction: any) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = props.layoutFunction(nodes, edges, {
                direction,
            });

            console.log(layoutedNodes, layoutedEdges);


            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);

            window.requestAnimationFrame(() => {
                reactFlowInstance.fitView();
            });
        },
        [nodes, edges]
    );

    useEffect(() => {
        setLayout('LR');
        console.log(nodes, edges);

    }, [])



    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                // fitView
                >
                    <Panel position="top-right">
                        <button type='button' onClick={setLayout}>layout</button>
                    </Panel>
                </ReactFlow>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </div>
        </>
    )

}
