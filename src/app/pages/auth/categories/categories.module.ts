import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';




@NgModule({
    declarations: [CategoryListComponent, CategoryFormComponent],
    imports: [CategoriesRoutingModule, SharedModule,TableModule,PaginatorModule]
})
export class CategoriesModule { }