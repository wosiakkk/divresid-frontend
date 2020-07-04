import { NgModule } from '@angular/core';
import { ChartModule } from "primeng/chart";
import { EntryReportComponent } from "./entry-report/entry-report.component";
import { SharedModule } from "../../../shared/shared.module";
import { ReportsRoutingModule } from "./reports-routing.module"


@NgModule({
    declarations: [EntryReportComponent],
    imports: [
        ChartModule,
        SharedModule,
        ReportsRoutingModule
    ]
})
export class ReportsModule {}