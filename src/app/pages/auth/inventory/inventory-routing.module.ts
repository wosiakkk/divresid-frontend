import { Routes, RouterModule } from "@angular/router";
import { InventoryListComponent } from './inventory-list/inventory-list.component'
import { InventoryFormComponent } from './inventory-form/inventory-form.component'
import { AuthGuard } from '../../../security/guards/auth/auth.guard'
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: InventoryListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: InventoryFormComponent, canActivate:[AuthGuard]},
    {path: ':id/edit', component: InventoryFormComponent, 
        canActivate:[AuthGuard]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule {}