import { FunctionComponent } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

const CustomEdgeComponent: FunctionComponent<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    markerStart,
    markerEnd,
    style
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerStart={markerStart}
                markerEnd={markerEnd}
                style={style}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, // This is important to auto reposition them
                        background: 'teal',
                        color: 'white',
                        padding: 5,
                        borderRadius: 5,
                        fontSize: 7,
                        fontWeight: 700,
                        width: "fit-content"

                    }}
                >
                    {label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdgeComponent;