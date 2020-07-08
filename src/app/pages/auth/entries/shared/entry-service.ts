import { Injectable, Injector } from '@angular/core'
import { BaseResourceService } from "../../../../shared/services/base-resource.service"
import { Entry } from "../shared/entry.model"
import { Observable } from 'rxjs';
import { CategoryService } from '../../categories/shared/category.service';
import { flatMap,catchError, map } from 'rxjs/operators';
import { User } from 'src/app/security/models/user.model';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';

const urlServer =  "http://localhost:4200/api/auth/entries";

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

    

    constructor(
        protected injector: Injector,
        protected categoryService: CategoryService
    ){
        super(urlServer,injector,Entry.fromJson, Entry.paginationFromJson);
    }
    
    //override para setar category
    create(entry: Entry): Observable<Entry>{
       return this.setCategoryInEntryObjectAndSendToServer(
           entry, super.create.bind(this)
        );
    }

    update(entry: Entry): Observable<Entry>{
        return this.setCategoryInEntryObjectAndSendToServer(
            entry, super.update.bind(this)
        );
      }

    setCategoryInEntryObjectAndSendToServer(entry: Entry, sendFunction: any){
        return this.categoryService.getById(entry.categoryId).pipe(
            flatMap(
                category =>{
                    entry.category = category;
                    return sendFunction(entry)
                }
            ),
            catchError(this.handleError)
        )
    }

    getByMonthAndYear(month: number, year: number, user : User)
        :Observable<Entry[]>{
        return this.http
            .get(
                `${urlServer}/byDate?userId=${user.id}&month=${month}&year=${year}`
            ).pipe(
                map(Entry.fromJson.bind(this)),
                catchError(this.handleError)
            );
    }

    getAllPaginationByMonthAndYear(pageable: Pageable, month: number,
        year: number,user : User): Observable<Entry[]>{
        if(pageable.sort === null)
            pageable.sort = "not";
        const url = `${this.apiPath}/pagination/filtered?page=${pageable.page}`
        +`&size=${pageable.size}&searchString=${pageable.sort}`
        +`&month=${month}&year=${year}&user=${user.id}`;
        return this.http.get(url).pipe(
          map(this.jsonDataToResourcesPagination.bind(this)),
          catchError(this.handleError)
        );
      }
}