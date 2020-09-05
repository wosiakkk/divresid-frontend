import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Property } from '../shared/property.model'
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { PropertyService } from '../shared/property.service'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent extends BaseResourceListComponent<Property> {

    faSearch = faSearch;

    cols: any[] = [
        { filed: 'active', header: 'Ativo', width: '10%' },
        { field: 'name', header: 'Nome' },
        { field: 'address', header: 'Endereço' },
        { field: 'actions', header: 'Ações' }
    ]

    constructor(
        private propertyService: PropertyService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenStorage: TokenStorageService
    ) { 
      super(propertyService,change,toastService,tokenStorage);
    }

}
