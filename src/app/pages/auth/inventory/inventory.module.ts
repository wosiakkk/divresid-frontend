import { NgModule } from "@angular/core";
import { InventoryFormComponent } from './inventory-form/inventory-form.component'
import { InventoryListComponent } from './inventory-list/inventory-list.component'
import { InventoryRoutingModule } from './inventory-routing.module'
import { SharedModule } from '../../../shared/shared.module'
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ListboxModule} from 'primeng/listbox';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
    declarations: [InventoryFormComponent, InventoryListComponent],
    imports: [SharedModule, TableModule, PaginatorModule,
         InventoryRoutingModule, ListboxModule, FileUploadModule]
})
export class InventoryModule {}