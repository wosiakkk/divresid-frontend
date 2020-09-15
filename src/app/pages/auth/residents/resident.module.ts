import { NgModule } from "@angular/core";
import { ResidentListComponent } from "./resident-list/resident-list.component";
import { ResidentRoutingModule } from "./resident-routing.module";
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator'
import { ResidentFormComponent } from './resident-form/resident-form.component';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
    declarations: [ResidentFormComponent, ResidentListComponent],
    imports: [ResidentRoutingModule, SharedModule, 
        TableModule, PaginatorModule, RadioButtonModule]
})
export class ResidentModule {}