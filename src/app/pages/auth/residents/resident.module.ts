import { NgModule } from "@angular/core";
import { ResidentListComponent } from "./resident-list/resident-list.component";
import { ResidentRoutingModule } from "./resident-routing.module";
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator'


@NgModule({
    declarations: [ResidentListComponent, ResidentListComponent],
    imports: [ResidentRoutingModule, SharedModule, TableModule, PaginatorModule]
})
export class ResidentModule {}