import { NgModule } from '@angular/core';
import { ChartModule } from "primeng/chart";
import { EntryReportComponent } from "./entry-report/entry-report.component";
import { SharedModule } from "../../../shared/shared.module";
import { ReportsRoutingModule } from "./reports-routing.module";
import { CurrencyPipe } from '@angular/common';


@NgModule({
    declarations: [EntryReportComponent],
    imports: [
        ChartModule,
        SharedModule,
        ReportsRoutingModule,
        
    ],
    providers: [CurrencyPipe]
})
export class ReportsModule {}