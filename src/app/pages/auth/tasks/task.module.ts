import { NgModule } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    declarations: [TaskFormComponent, TaskListComponent],
    imports: [SharedModule, TableModule, PaginatorModule,
        TaskRoutingModule, ListboxModule, CalendarModule, InputSwitchModule ]
})
export class TaskModule {}