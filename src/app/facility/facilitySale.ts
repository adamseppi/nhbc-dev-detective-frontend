import {FacilitySaleItem} from './facilitySaleItem'
import {Facility} from '../facility/facility'
export class FacilitySale
{
    FacilityId: number;
    Id: string;
    CreatedDate :string;
    Completed:boolean;
    CustomerName:string;
    FacilitySaleItems: FacilitySaleItem[];
    Facility:Facility

    
    
}
