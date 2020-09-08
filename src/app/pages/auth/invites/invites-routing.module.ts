import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteListComponent } from './invite-list/invite-list.component';
import { InviteFormComponent } from './invite-form/invite-form.component';
import { AuthGuard } from '../../../security/guards/auth/auth.guard';

const routes: Routes = [
    {path: '', component: InviteListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: InviteFormComponent, canActivate:[AuthGuard]},
    {path: ':id/edit', component: InviteFormComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvitesRoutingModule {}