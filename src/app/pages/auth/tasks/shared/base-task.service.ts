import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Pageable } from "../../../../shared/interfaces/pageable.interface";
import { BaseResourceService } from "../../../../shared/services/base-resource.service";
import { Property } from "../../properties/shared/property.model";
import { Task } from "./task.model";



export class BaseTaskService extends BaseResourceService<Task>{
    
    //override
    getNumberOfResources(property: Property): Observable<any>{
        const url =
            `${this.apiPath}/pagination/items/count?property=${property.id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError)
        )
    }

    //override
    getAllPagination(pageable: Pageable, property: Property):
        Observable<any> {

        if(pageable.sort === null)
            pageable.sort = "not";
        const url = `${this.apiPath}/pagination/items?page=${pageable.page}`
                    +`&size=${pageable.size}&searchString=${pageable.sort}`
                    +`&property=${property.id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResourcesPagination.bind(this)),
            catchError(this.handleError)
        );
    }

}