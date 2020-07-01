import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntriesRoutingModule } from "./entries-routing.module"

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
    imports: [
        SharedModule,
        TableModule,
        PaginatorModule,
        EntriesRoutingModule,
        CalendarModule,
        IMaskModule
    ],
    declarations: [EntryListComponent, EntryFormComponent]  
})
export class EntriesModule{}