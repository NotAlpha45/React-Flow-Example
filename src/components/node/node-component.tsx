import { Handle, Position, NodeProps } from 'reactflow';

type NodeComponentProps = {
    color: string;
    id: string;
    label: string;
}

function NodeComponent(props: NodeProps<NodeComponentProps>) {

    return (
        <div style={{ backgroundColor: props.data?.color || "red", borderRadius: 10 }}>
            <Handle type="target" position={Position.Top} />
            <div style={{ padding: 20 }}>
                {props.data?.label}
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default NodeComponent;