import { FacilityInventoryItemType } from '../facilityInventoryItem/facilityInventoryItem'
export class FacilitySaleItem {
    Id: number;
    FacilityInventoryItemTypeId: number;
    FacilitySaleId: string;

    Quantity: number;
    Notes: string;
    FacilityInventoryItemType: FacilityInventoryItemType;
}