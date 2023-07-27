import { ReactFlowProvider } from 'reactflow'
import GraphComponent from './graph-component'
import { useEffect } from 'react';
import { EntityConverter } from '../../utils/entity-utils/entity-conversion-util';
import GraphFilterLeftSidebar from '../graph-filter/graph-filter-left-sidebar';

export default function GraphDisplayer() {

    useEffect(() => {
        EntityConverter.convertEntitiesToGraph();
    }, [])


    return (
        <>
            <ReactFlowProvider>
                <div className='flex w-screen h-screen'>
                    <GraphFilterLeftSidebar />
                    <GraphComponent />
                </div>
            </ReactFlowProvider>
        </>
    )
}
