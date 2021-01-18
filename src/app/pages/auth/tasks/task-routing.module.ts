import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { AuthGuard } from '../../../security/guards/auth/auth.guard';


const routes: Routes = [
    {path: '', component: TaskListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: TaskFormComponent, canActivate:[AuthGuard]},
    {path: ':id/edit', component: TaskFormComponent, canActivate:[AuthGuard]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule {}