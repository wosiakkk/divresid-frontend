import { NgModule } from "@angular/core";
import { Routes, RouterModule } from  '@angular/router';
import { ResidentListComponent } from  './resident-list/resident-list.component';
import { ResidentFormComponent } from './resident-form/resident-form.component';
import { AuthGuard } from  '../../../security/guards/auth/auth.guard';


const routes: Routes = [
    {path: '', component: ResidentListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: ResidentFormComponent, canActivate:[AuthGuard]},
    {path:':id/edit', component: ResidentFormComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResidentRoutingModule {}