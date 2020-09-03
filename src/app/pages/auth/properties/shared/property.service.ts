import { Injectable, Injector } from '@angular/core'
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
}