import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PropertyListComponent } from './property-list/property-list.component'
import { PropertyFormComponent } from './property-form/property-form.component'
import { AuthGuard } from '../../../security/guards/auth/auth.guard'


const routes: Routes = [
    {path: '', component: PropertyListComponent, canActivate: [AuthGuard]},
    {path: 'new', component: PropertyFormComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: PropertyFormComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertiesRoutingModule{}