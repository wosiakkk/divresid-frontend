import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CollectiveEntryListComponent } from './collective-entry-list/collective-entry-list.component'
import { CollectiveEntryFormComponent } from './collective-entry-form/collective-entry-form.component'
import { AuthGuard } from '../../../security/guards/auth/auth.guard'
import { AdminGuard } from '../../../security/guards/admin/admin.guard'


const routes: Routes = [
    {path: '', component: CollectiveEntryListComponent,
        canActivate: [AuthGuard]},
    {path: 'new', component: CollectiveEntryFormComponent,
        canActivate: [AuthGuard, AdminGuard]},
    {path: ':id/edit', component: CollectiveEntryFormComponent,
        canActivate: [AuthGuard,AdminGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CollectiveEntriesRoutingModule {}