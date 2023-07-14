import { Entity } from "../types/entity-types";

export const initialEntities: Entity[] = [
  {
    self: {
      entityId: "master",
      entityName: "Master",
      incorporationJurisdiction: "US",
      entityType: "Corporation",
      subNational: "US",
      sicCode: "1234",
    },
    ownerships: [
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
    ],
  },
  {
    self: {
      entityId: "1",
      entityName: "Entity 1",
      incorporationJurisdiction: "US",
      entityType: "Corporation",
      subNational: "US",
      sicCode: "1234",
    },
    ownerships: [
      {
        ownershipId: "1",
        ownerId: "1",
        ownedId: "2",
        ownershipName: "Entity 1",
        ownershipPercentage: 30,
      },
    ],
  },
  {
    self: {
      entityId: "2",
      entityName: "Entity 2",
      incorporationJurisdiction: "US",
      entityType: "Corporation",
      subNational: "US",
      sicCode: "1234",
    },
    ownerships: [],
  },
  {
    self: {
      entityId: "3",
      entityName: "Entity 3",
      incorporationJurisdiction: "US",
      entityType: "Corporation",
      subNational: "US",
      sicCode: "1234",
    },
    ownerships: [
      {
        ownershipId: "3",
        ownerId: "3",
        ownedId: "4",
        ownershipName: "Entity 3",
        ownershipPercentage: 100,
      },
      {
        ownershipId: "4",
        ownerId: "3",
        ownedId: "2",
        ownershipName: "Entity 3",
        ownershipPercentage: 70,
      },
    ],
  },
  {
    self: {
      entityId: "4",
      entityName: "Entity 4",
      incorporationJurisdiction: "US",
      entityType: "Corporation",
      subNational: "US",
      sicCode: "1234",
    },
    ownerships: [
      {
        ownershipId: "5",
        ownerId: "4",
        ownedId: "5",
        ownershipName: "Entity 4",
        ownershipPercentage: 100,
      },
    ],
  },
];
