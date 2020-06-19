import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { IndexGuard } from "./index/guard/index.guard"; 

const routes: Routes = [
    {path: '', component: IndexComponent, canActivate: [IndexGuard]},
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class IndexRoutingModule {}