export type OwnerShip = {
  ownershipId: string;
  ownerId: string;
  ownedId: string;
  ownershipName: string;
  ownershipPercentage: number;
};

export type Entity = {
  entityId: string;
  entityName: string;
  incorporationJurisdiction: string;
  entityType: string;
  subNational: string;
  sicCode: string;
};
