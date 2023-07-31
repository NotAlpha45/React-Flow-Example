import { appStore } from "../../stores/redux-store";
import { Entity } from "../../types/entity-types";

export class EntityControlUtils {
  static getEntityNamesAndIds(
    entities: Entity[] = appStore.getState().entity.entities
  ) {
    return entities.map((entity) => {
      return {
        entityId: entity.entityId,
        entityName: entity.entityName,
      };
    });
  }
}
