import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
    imports: [SharedModule,TableModule,PaginatorModule]  
})
export class EntriesModule{}