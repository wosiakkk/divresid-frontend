import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { AuthGuard } from "../../../security/guards/auth/auth.guard"

const routes: Routes = [
    {path: '', component: EntryListComponent, canActivate:[AuthGuard]},
    {path: 'new', component: EntryFormComponent, canActivate:[AuthGuard]},
    {path: ':id/edit', component: EntryFormComponent, canActivate:[AuthGuard]}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EntriesRoutingModule {}