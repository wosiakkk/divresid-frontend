import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryReportComponent } from './entry-report/entry-report.component'

const routes: Routes = [
    {path: '', component: EntryReportComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}