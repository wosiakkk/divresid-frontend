import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* código de teste de segurnaça a ser refatorado*/ 
import { RegistrerComponent } from './security/pages/registrer/registrer.component';
import { LoginComponent } from './security/pages/login/login.component';
import { TempHomeComponent } from './security/pages/temp-home/temp-home.component';
import { TempProfileComponent } from './security/pages/temp-profile/temp-profile.component';
import { TempBoardUserComponent } from './security/pages/temp-board-user/temp-board-user.component';
import { TempBoardModeratorComponent } from './security/pages/temp-board-moderator/temp-board-moderator.component';
import { TempBoardAdminComponent } from './security/pages/temp-board-admin/temp-board-admin.component';
/* ***********************************************/

const routes: Routes = [
  { path: 'home', component: TempHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  { path: 'profile', component: TempProfileComponent },
  { path: 'user', component: TempBoardUserComponent },
  { path: 'mod', component: TempBoardModeratorComponent },
  { path: 'admin', component: TempBoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
