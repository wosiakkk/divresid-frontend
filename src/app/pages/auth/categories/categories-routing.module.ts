import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from "../../../security/guards/auth/auth.guard";


const routes: Routes = [
    {path: '', component: CategoryListComponent, canActivate: [AuthGuard]},
    {path: 'new', component: CategoryFormComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: CategoryFormComponent, canActivate: [AuthGuard]}
  ];
  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CategoriesRoutingModule { }




