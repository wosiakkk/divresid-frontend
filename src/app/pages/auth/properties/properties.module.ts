import { NgModule } from '@angular/core'
import { SharedModule } from '../../../shared/shared.module'
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { InputSwitchModule } from 'primeng/inputswitch';
import { IMaskModule } from 'angular-imask'
import { PropertyFormComponent } from './property-form/property-form.component'
import { PropertyListComponent } from './property-list/property-list.component'
import { PropertiesRoutingModule } from './properties-routing.module'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
//import { EditorModule } from 'primeng/editor';


@NgModule({
    imports: [
        SharedModule,
        TableModule,
        PaginatorModule,
        InputSwitchModule,
        PropertiesRoutingModule,
        IMaskModule,
        ProgressSpinnerModule,
        //EditorModule
    ],
    declarations: [PropertyFormComponent, PropertyListComponent]
})
export class PropertiesModule{}