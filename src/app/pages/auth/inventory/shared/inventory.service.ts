import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseResourceService } from "../../../../shared/services/base-resource.service";
import { BaseInventoryService } from "./base-inventory.service";
import { PropertyItem } from "./propertyItem.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseInventoryService{

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/inventory", 
        injector, PropertyItem.fromJson, PropertyItem.paginationFromJson);
    }

    uploadFile(formData: FormData): Observable<any>{
        const url = 
            `${this.apiPath}/items/upload`;
      
        return this.http.post(url,formData).pipe(
            catchError(this.handleError)
        )
    }
}