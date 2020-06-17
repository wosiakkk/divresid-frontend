import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [CategoryListComponent, CategoryFormComponent],
    imports: [CategoriesRoutingModule, SharedModule]
})
export class CategoriesModule { }