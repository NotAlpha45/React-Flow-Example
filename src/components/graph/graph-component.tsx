import { useCallback, useEffect } from 'react'
import ReactFlow, { Controls, MiniMap, useReactFlow, Node, Edge, useNodesState, useEdgesState, Background, Panel, BackgroundVariant } from 'reactflow'
import { initialEdges, initialNodes } from '../../stores/slices/nodes-edges';
import 'reactflow/dist/style.css';

interface GraphComponentProps {

    layoutFunction: (nodes: Node[], edges: Edge[], options: {
        rankdir: string;
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
        () => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = props.layoutFunction(nodes, edges, { rankdir: 'LR' });

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);

            window.requestAnimationFrame(() => {
                reactFlowInstance.fitView();
            });
        },
        [nodes, edges]
    );

    useEffect(() => {
        setLayout();
        console.log("fit view");

    }, [reactFlowInstance])


    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <Panel position="top-right">
                        <button type='button' onClick={setLayout}>Reset Layout</button>
                    </Panel>
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </div>
        </>
    )

}
