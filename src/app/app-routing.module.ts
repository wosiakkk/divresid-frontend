import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'index', loadChildren: ()=> import('./pages/public/index/index.module').then(m => m.IndexModule) },
  { path: 'login', loadChildren: ()=> import('./pages/public/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: ()=> import('./pages/public/singnup/singnup.module').then(m => m.SingnupModule) },
  { path: '', redirectTo: '/index', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
