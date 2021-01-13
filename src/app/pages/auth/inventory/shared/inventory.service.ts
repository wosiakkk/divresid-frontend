import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "../../../../shared/services/base-resource.service";
import { PropertyItem } from "./propertyItem.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseResourceService<PropertyItem>{

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/inventory", 
        injector, PropertyItem.fromJson, PropertyItem.paginationFromJson);
    }
}