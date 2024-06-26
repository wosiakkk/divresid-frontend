import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PropertyListComponent } from './property-list/property-list.component'
import { PropertyFormComponent } from './property-form/property-form.component'
import { PropertyRulesViewComponent } from './property-rules-view/property-rules-view.component'
import { PropertyRulesFormComponent } from './property-rules-form/property-rules-form.component'
import { AuthGuard } from '../../../security/guards/auth/auth.guard';
import { AdminGuard } from '../../../security/guards/admin/admin.guard';
import { PropertyProfileComponent } from './property-profile/property-profile.component'


const routes: Routes = [
    {path: '', component: PropertyListComponent, canActivate: [AuthGuard]},
    {path: 'new', component: PropertyFormComponent,
        canActivate: [AuthGuard, AdminGuard]},
    {path: ':id/edit', component: PropertyFormComponent,
        canActivate: [AuthGuard, AdminGuard]},
    {path: 'rules', component: PropertyRulesViewComponent,
        canActivate: [AuthGuard]},
    {path: 'rules/editor', component: PropertyRulesFormComponent,
        canActivate: [AuthGuard, AdminGuard]},
    {path: 'profile', component: PropertyProfileComponent,
        canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertiesRoutingModule{}