import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import {  Resident } from './resident.model'



@Injectable({
    providedIn: 'root'
})
export class ResidentService extends BaseResourceService<Resident>{
    
    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/residents", injector,
        Resident.fromJson, Resident.paginationFromJson);
    }


    setNewRole(resident: Resident): Observable<Resident>{
        const url = "http://localhost:4200/api/auth/residents/newRole";
        return this.http.put(url,resident).pipe(
            map(()=> resident,
            catchError(this.handleError))
        )
    }

}