import { NgModule } from '@angular/core';
import { InviteListComponent } from './invite-list/invite-list.component';
import { InviteFormComponent } from './invite-form/invite-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InvitesRoutingModule } from './invites-routing.module';



@NgModule({
    declarations: [InviteListComponent, InviteFormComponent],
    imports: [InvitesRoutingModule, SharedModule, TableModule,PaginatorModule]
})
export class InvitesModule {}