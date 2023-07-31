import { Entity, OwnerShip } from "../types/entity-types";

export const initialOwnerships: OwnerShip[] = [
  {
    ownershipId: "master-1",
    ownerId: "master",
    ownedId: "1",
    ownershipName: "Master",
    ownershipPercentage: 50,
  },
  {
    ownershipId: "master-2",
    ownerId: "master",
    ownedId: "3",
    ownershipName: "Master",
    ownershipPercentage: 50,
  },
  {
    ownershipId: "1",
    ownerId: "1",
    ownedId: "2",
    ownershipName: "Entity 1",
    ownershipPercentage: 30,
  },
  {
    ownershipId: "3",
    ownerId: "3",
    ownedId: "4",
    ownershipName: "Entity 3",
    ownershipPercentage: 50,
  },
  {
    ownershipId: "4",
    ownerId: "3",
    ownedId: "2",
    ownershipName: "Entity 3",
    ownershipPercentage: 70,
  },
  {
    ownershipId: "5",
    ownerId: "4",
    ownedId: "5",
    ownershipName: "Entity 4",
    ownershipPercentage: 100,
  },
];

export const initialEntities: Entity[] = [
  {
    entityId: "master",
    entityName: "Master",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
  {
    entityId: "1",
    entityName: "Entity 1",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
  {
    entityId: "2",
    entityName: "Entity 2",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
  {
    entityId: "3",
    entityName: "Entity 3",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
  {
    entityId: "4",
    entityName: "Entity 4",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
  {
    entityId: "5",
    entityName: "Entity 5",
    incorporationJurisdiction: "US",
    entityType: "Corporation",
    subNational: "US",
    sicCode: "1234",
  },
];
