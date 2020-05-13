import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginGuard } from "../../../security/guards/login/login.guard";

const routes: Routes = [
    {path: '', canActivate: [LoginGuard], component: LoginFormComponent},
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LoginRoutingModule {}