import { ReactFlowProvider } from 'reactflow'
import GraphComponent from './graph-component'
import { useEffect } from 'react';
import { EntityConverter } from '../../utils/entity-utils/entity-conversion-util';

export default function GraphDisplayer() {

    useEffect(() => {
        EntityConverter.convertEntitiesToGraph();
    }, [])


    return (
        <>
            <ReactFlowProvider>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <GraphComponent />
                </div>
            </ReactFlowProvider>
        </>
    )
}
