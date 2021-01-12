import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { CollectiveEntry } from './collective-entry.model';
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from 'src/app/security/models/user.model';
import { CategoryService } from '../../categories/shared/category.service';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';

const urlServer =  "http://localhost:4200/api/auth/collective";

@Injectable({
    providedIn: 'root'
})
export class CollectiveEntriesService extends BaseResourceService<CollectiveEntry> {

    constructor(
        protected injector: Injector,
        protected categoryService: CategoryService){
        super(urlServer,injector, 
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

    getByMOnthAndYear(month: number, year: number, user : User)
        : Observable<CollectiveEntry[]>{
            return this.http
                .get(
                    `${urlServer}/byDate?userId=${user.id}`+
                        `&month=${month}&year=${year}`
                ).pipe(
                    map(CollectiveEntry.fromJson.bind(this)),
                    catchError(this.handleError)
                );
    }

    getAllPaginationByMonthAndYear(pageable: Pageable, month: number,
        year: number,user : User): Observable<CollectiveEntry[]>{
            if(pageable.sort === null)
            pageable.sort = "not";
            const url = `${this.apiPath}/pagination/filtered?page=${pageable.page}`
                +`&size=${pageable.size}&searchString=${pageable.sort}`
                +`&month=${month}&year=${year}&userId=${user.id}`;

            return this.http.get(url).pipe(
            map(this.jsonDataToResourcesPagination.bind(this)),
            catchError(this.handleError)
            );
        }

}