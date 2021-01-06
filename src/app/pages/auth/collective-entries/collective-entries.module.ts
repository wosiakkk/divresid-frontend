import { NgModule } from '@angular/core'
import { CollectiveEntryFormComponent } from './collective-entry-form/collective-entry-form.component';
import { CollectiveEntryListComponent } from './collective-entry-list/collective-entry-list.component';
import { SharedModule } from '../../../shared/shared.module'
import { CollectiveEntriesRoutingModule } from './collective-entries-routing.module';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations:[CollectiveEntryListComponent,
        CollectiveEntryFormComponent],
    imports:[
        SharedModule, CollectiveEntriesRoutingModule,
        TableModule, PaginatorModule, IMaskModule, 
        CalendarModule, MultiSelectModule
    ]
})
export class CollectiveEntriesModule {}