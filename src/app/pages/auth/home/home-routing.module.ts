import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../../../security/guards/auth/auth.guard";

const routes: Routes = [
    { path: ''  , 
      component: HomeComponent,
      canActivate: [AuthGuard],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LoginRoutingModule {}