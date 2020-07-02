import { Injectable, Injector } from '@angular/core'
import { BaseResourceService } from "../../../../shared/services/base-resource.service"
import { Entry } from "../shared/entry.model"
import { Observable } from 'rxjs';
import { CategoryService } from '../../categories/shared/category.service';
import { flatMap,catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

    constructor(
        protected injector: Injector,
        protected categoryService: CategoryService
    ){
        super("http://localhost:4200/api/auth/entries",injector, 
                Entry.fromJson, Entry.paginationFromJson);
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
}