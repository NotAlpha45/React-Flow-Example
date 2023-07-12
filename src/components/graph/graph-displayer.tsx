import { ReactFlowProvider } from 'reactflow'
import GraphComponent from './graph-component'
import { GraphLayoutUtils } from '../../utils/graph-utils/graph-layout-utils';

export default function GraphDisplayer() {



    const layoutFunction = GraphLayoutUtils.d3LayoutMaker;


    return (
        <>
            <ReactFlowProvider>
                <GraphComponent
                    layoutFunction={layoutFunction}
                />
            </ReactFlowProvider>
        </>
    )
}
