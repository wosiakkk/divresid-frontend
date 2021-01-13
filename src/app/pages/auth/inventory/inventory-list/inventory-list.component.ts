import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { PropertyItem } from '../shared/propertyItem.model';
import { InventoryService } from '../shared/inventory.service'
import { User } from 'src/app/security/models/user.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Property } from '../../properties/shared/property.model';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent 
    extends BaseResourceListComponent<PropertyItem> {

    constructor(
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenSotrage: TokenStorageService,
        private inventoryService: InventoryService,
        private propertyService: PropertyService
    ) {
        super(inventoryService,change,toastService,tokenSotrage);    
    }

    faSearch = faSearch;

    activeProperty: Property;

    cols: any[] =  [
        { field: 'id', header: 'Categorias' },
        { field: 'desc', header: 'Ações' },
      ];

    //override
    ngOnInit(): void { 
        let user:User = this.loadAuthResource();
        this.propertyService
            .getCurrentActivePropertyId(user.id).subscribe(
                property => this.activeProperty = property
            )
        this.inventoryService.getNumberOfResources(this.activeProperty)
            .subscribe(
                count => this.totalRecords = count
            )
       
    }

    //override
    loadLazyData(event: LazyLoadEvent) {
        console.log("event: "+ JSON.stringify(event));
        this.loading = true;
        this.change.detectChanges();
        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            let user:User = this.loadAuthResource();
            this.inventoryService
                .getAllPagination(pageableData,this.activeProperty).subscribe(
                    resources => {
                        this.resources = resources;
                        this.totalRecords = this.inventoryService.totalElements;
                        this.loading = false;
                        if(this.resources.length<=0)
                            this.emptyList=true;
                        this.change.detectChanges();
                    },
                    error => {
                        this.toastService.loadServerListErrorToast();
                    }
                )
        }, 300 );   
    }


}
