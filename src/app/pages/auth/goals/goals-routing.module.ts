import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GoalsListComponent } from "./goals-list/goals-list.component";
import { AuthGuard } from "../../../security/guards/auth/auth.guard";
import { GoalsFormComponent } from "./goals-form/goals-form.component";


const routes: Routes = [
    {path: '', component: GoalsListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: GoalsFormComponent, canActivate:[AuthGuard]},
    {path: ':id/edit', component: GoalsFormComponent, canActivate:[AuthGuard]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoalsRoutingModule { }