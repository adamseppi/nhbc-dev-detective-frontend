 export  class FacilityInventoryItemType
    { Id: number;
        Name: string;
        CreatedDate: Date;
        UpdateDate: Date;
        IsActive: boolean;
        Sku: string;
        QuantityOnHand: number;
        QuantityOnOrder: number;
        InventoryItemTypeId: number;
        FacilityId: number;
        Facility?: any;
        InventoryItemType?: any;
      }
