import { Injectable, Injector } from '@angular/core'
import { BaseResourceService } from "../../../../shared/services/base-resource.service"
import { Entry } from "../shared/entry.model"

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

    constructor(
        protected injector: Injector
    ){
        super("http://localhost:4200/api/auth/entries",injector, 
                Entry.fromJson, Entry.paginationFromJson);
    }    
}