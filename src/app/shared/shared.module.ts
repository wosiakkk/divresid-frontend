import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [PageHeaderComponent],
    imports: [CommonModule,RouterModule,FontAwesomeModule],
    exports: [
        //shared modules
        CommonModule,
        FontAwesomeModule,
        //shares components
        PageHeaderComponent,
      
    ]
})
export class SharedModule { }
