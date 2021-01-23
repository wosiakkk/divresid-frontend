import { NgModule } from '@angular/core'
import { GoalsFormComponent } from './goals-form/goals-form.component'
import { GoalsListComponent } from './goals-list/goals-list.component'
import { SharedModule } from '../../../shared/shared.module'
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { GoalsRoutingModule } from './goals-routing.module';

@NgModule({
    declarations: [GoalsFormComponent, GoalsListComponent],
    imports: [GoalsRoutingModule, SharedModule, TableModule,PaginatorModule]
})
export class GoalsModule { }