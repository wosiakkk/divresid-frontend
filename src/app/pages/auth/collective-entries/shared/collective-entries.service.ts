import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { CollectiveEntry } from './collective-entry.model';
import { Injectable, Injector } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class CollectiveEntriesService extends BaseResourceService<CollectiveEntry> {

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/collective",injector,
            CollectiveEntry.fromJson,CollectiveEntry.paginationFromJson);
    }

}