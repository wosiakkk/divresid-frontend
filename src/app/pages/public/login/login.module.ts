import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        LoginRoutingModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule
    ],
    exports: [
        CommonModule
    ]
})
export class LoginModule {}