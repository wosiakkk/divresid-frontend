import { ChangeDetectorRef, Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent } from 'primeng/api';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { InventoryService } from '../shared/inventory.service';
import { PropertyItem } from '../shared/propertyItem.model';

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

    activeProperty: Property = new Property();

    cols: any[] =  [
        { field: 'id', header: 'Categorias' },
        { field: 'desc', header: 'Ações' },
      ];

    //override
    async ngOnInit(){
        this.loading = true;
        let user:User = this.loadAuthResource();
        this.activeProperty =  await this.loadActiveProperty(user)
            .catch(() => {return new Property()});
        setTimeout(() => {},300);
    }

    //override
    loadLazyData(event: LazyLoadEvent) {
        this.loading = true;
        this.change.detectChanges();
        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            this.change.detectChanges();
            if(this.activeProperty.id > 0){
                    console.log('PORRRRRRRRRR: '+ JSON.stringify(this.activeProperty))
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
            }else{
                this.resources = [];
                this.totalRecords = 0;
                this.loading = false;
            }
            
        }, 300 );   
    }

    loadActiveProperty(user: User): Promise<Property>{
        return this.propertyService
            .getCurrentActivePropertyId(user.id).toPromise();
    }

}
