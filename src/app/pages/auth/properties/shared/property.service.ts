import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { Property } from './property.model'

@Injectable({
    providedIn: 'root'
})
export class PropertyService extends BaseResourceService<Property>{

    constructor( 
            protected injector: Injector,
            private tokenService: TokenStorageService
        ) {
        super(
            "http://localhost:4200/api/auth/properties", injector, 
            Property.fromJson, Property.paginationFromJson
        );
    }

    getCurrentActivePropertyId(userId: number): Observable<any>{
        let userAuth: User = this.tokenService.currentUser;
        if(userAuth.roles[0] == 'ROLE_RESIDENT'){
            return this.http
            .get(`${this.apiPath}/currentActiveOfResident?userId=${userId}`)
                .pipe(catchError(this.handleError))
        } else{
            return this.http
            .get(`${this.apiPath}/currentActive?userId=${userId}`)
                .pipe(catchError(this.handleError))
        }
    }

   checkActivePropertyId(userId: number): Observable<any>{
        let userAuth: User = this.tokenService.currentUser;
        if(userAuth.roles[0] == 'ROLE_RESIDENT'){
            return this.http
            .get(`${this.apiPath}/currentActiveOfResident?userId=${userId}`)
                .pipe(catchError(this.handleError))
        } else{
            return this.http
            .get(`${this.apiPath}/currentActive?userId=${userId}`)
                .pipe(catchError(this.handleError))
        }
    }

    removeResident(userId: number, propertyId: number){
        return this.http.delete(`${this.apiPath}`+
            `/removeResident?userId=${userId}&propertyId=${propertyId}`)
            .pipe(catchError(this.handleError))
    }

}