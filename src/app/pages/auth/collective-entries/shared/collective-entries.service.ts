import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { CollectiveEntry } from './collective-entry.model';
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from 'src/app/security/models/user.model';
import { CategoryService } from '../../categories/shared/category.service';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CollectiveEntriesService extends BaseResourceService<CollectiveEntry> {

    constructor(
        protected injector: Injector,
        protected categoryService: CategoryService){
        super("http://localhost:4200/api/auth/collective",injector,
            CollectiveEntry.fromJson,CollectiveEntry.paginationFromJson);
    }

    create(collective: CollectiveEntry): Observable<CollectiveEntry>{
        return this.setCategoryAndResidentsInCollectiveAndSendToServer(
            collective, collective.selectedResidents, super.create.bind(this)
        )
    }

    setCategoryAndResidentsInCollectiveAndSendToServer
        (collective: CollectiveEntry, selectedResidents: User[],
        sendFunction: any){
        
        return this.categoryService.getById(collective.categoryId).pipe(
            flatMap(
                category =>{
                    collective.category = category;
                    collective.residents = selectedResidents;
                    return sendFunction(collective);
                }
            ),
            catchError(this.handleError)
        )
    }

}