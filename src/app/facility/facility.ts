export interface Facility {
           Id: number;
        Name: string;
        CreatedDate: Date;
        UpdateDate: Date;
        IsActive: boolean;
        ParentFacilityId?: number;
        TenantId: number;
        FacilityInventoryItemTypes: any[];
        ParentFacility?: number;
        InverseParentFacility?: any;
        Tenant?: any;
        TotalRevenue:number;
    } 

 