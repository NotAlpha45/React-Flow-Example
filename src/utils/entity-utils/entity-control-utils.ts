import { appStore } from "../../stores/redux-store";
import { Entity } from "../../types/entity-types";

export class EntityControlUtils {
  static getEntityNamesAndIds(entities: Entity[] = appStore.getState().entity) {
    return entities.map((entity) => {
      return {
        entityId: entity.self.entityId,
        entityName: entity.self.entityName,
      };
    });
  }
}
