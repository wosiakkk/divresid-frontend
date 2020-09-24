import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "../../../../shared/services/base-resource.service";
import { Resident } from "../../residents/shared/resident.model";


@Injectable({
    providedIn: 'root'
})
export class UserProfileService extends BaseResourceService<Resident>{
    
    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/residents", injector,
        Resident.fromJson, Resident.paginationFromJson);
    }
}