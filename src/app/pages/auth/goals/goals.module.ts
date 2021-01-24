import { NgModule } from '@angular/core'
import { GoalsFormComponent } from './goals-form/goals-form.component'
import { GoalsListComponent } from './goals-list/goals-list.component'
import { SharedModule } from '../../../shared/shared.module'
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { GoalsRoutingModule } from './goals-routing.module';
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    declarations: [GoalsFormComponent, GoalsListComponent],
    imports: [GoalsRoutingModule, SharedModule,
        TableModule,PaginatorModule, CalendarModule, IMaskModule,
         InputSwitchModule]
})
export class GoalsModule { }