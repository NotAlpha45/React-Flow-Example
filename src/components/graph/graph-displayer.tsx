import { ReactFlowProvider } from 'reactflow'
import GraphComponent from './graph-component'
import { GraphUtils } from '../../assets/utils/graph-utils/graph-utils';

export default function GraphDisplayer() {



    const layoutFunction = GraphUtils.d3LayoutMaker;


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
