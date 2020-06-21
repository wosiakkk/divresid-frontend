import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';


@NgModule({
    declarations: [PageHeaderComponent, FormFieldErrorComponent],
    imports: [CommonModule,RouterModule,FontAwesomeModule],
    exports: [
        //shared modules
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        //shares components
        PageHeaderComponent,
        FormFieldErrorComponent,
      
    ]
})
export class SharedModule { }
