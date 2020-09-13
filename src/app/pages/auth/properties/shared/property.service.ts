import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { Property } from './property.model'

@Injectable({
    providedIn: 'root'
})
export class PropertyService extends BaseResourceService<Property>{

    constructor( protected injector: Injector) {
        super(
            "http://localhost:4200/api/auth/properties", injector, 
            Property.fromJson, Property.paginationFromJson
        );
    }

    getCurrentActivePropertyId(userId: number): Observable<any>{
        return this.http
            .get(`${this.apiPath}/currentActive?userId=${userId}`)
                .pipe(catchError(this.handleError))
    }

    removeResident(userId: number, propertyId: number){
        return this.http.delete(`${this.apiPath}`+
            `/removeResident?userId=${userId}&propertyId=${propertyId}`)
            .pipe(catchError(this.handleError))
    }

}