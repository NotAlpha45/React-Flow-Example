import { Node, Edge, ReactFlowProvider } from 'reactflow'
import GraphComponent from './graph-component'
import { HierarchyPointNode, stratify, tree } from 'd3-hierarchy';

export default function GraphDisplayer() {

    const graphLayout = tree()

    const getLayoutedElements = (nodes: Node[], edges: Edge[], options: { direction: any; }) => {
        if (nodes.length === 0) return { nodes, edges };

        const { width, height } = document
            ?.querySelector(`[data-id="${nodes[0].id}"]`)
            ?.getBoundingClientRect() || { width: 0, height: 0 };

        const hierarchy = stratify()
            .id((node: any) => node.id)
            .parentId((node: any) => edges.find((edge: any) => edge.target === node.id)?.source);

        const root = hierarchy(nodes);

        const layout = graphLayout.nodeSize([width * 2, height * 2])(root);

        return {
            nodes: layout
                .descendants()
                .map((node: HierarchyPointNode<any>) => ({ ...node.data, position: { x: node.x, y: node.y } })),
            edges,
        };
    };


    return (
        <>
            <ReactFlowProvider>
                <GraphComponent
                    layoutFunction={getLayoutedElements}
                />
            </ReactFlowProvider>
        </>
    )
}
