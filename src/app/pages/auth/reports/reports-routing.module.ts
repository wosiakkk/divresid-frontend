import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryReportComponent } from './entry-report/entry-report.component'
import { AuthGuard } from "../../../security/guards/auth/auth.guard"

const routes: Routes = [
    {path: '', component: EntryReportComponent ,canActivate:[AuthGuard]}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}