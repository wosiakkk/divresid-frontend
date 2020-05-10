import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingnupComponent } from "./singnup/singnup.component";

const routes: Routes = [
    {path: '', component: SingnupComponent},
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SingnupRoutingModule {}