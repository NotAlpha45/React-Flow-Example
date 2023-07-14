import { defaultNodePosition } from "../../dummy-data/nodes-edges";
import { appStore } from "../../stores/redux-store";
import { GraphSliceActions } from "../../stores/slices/graph-slice";
import { EdgeStyle1 } from "../../styles/graph-style-constants";
import { Entity, OwnerShip } from "../../types/entity-types";
import { Edge, Node } from "reactflow";

export class EntityConverter {
  static convertEntitiesToGraph(
    entities: Entity[] = appStore.getState().entity
  ) {
    const convertedNodes: Node[] = entities.map((entity: Entity) => {
      return {
        id: entity.self.entityId,
        data: {
          label: entity.self.entityName,
          entity: entity,
        },
        position: defaultNodePosition,
      };
    });

    const convertedEdges: Edge[] = [];

    entities.forEach((entity: Entity) => {
      entity.ownerships.forEach((ownership: OwnerShip) => {
        convertedEdges.push({
          id: ownership.ownershipId,
          source: ownership.ownerId,
          target: ownership.ownedId,
          animated: true,
          label: `${ownership.ownershipName} ${ownership.ownershipPercentage}%`,
          style: EdgeStyle1.style,
          markerStart: EdgeStyle1.markerStart,
        });
      });
    });

    appStore.dispatch(
      GraphSliceActions.addNewBulkConnections({
        nodes: convertedNodes,
        edges: convertedEdges,
      })
    );

    return { convertedNodes, convertedEdges };
  }
}
