import { NgModule } from '@angular/core';
import { SingnupComponent } from './singnup/singnup.component';
import { SingnupRoutingModule } from "./singnup-routing.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        SingnupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        SingnupRoutingModule
    ],
    exports: [
        CommonModule
    ]
})
export class SingnupModule {}