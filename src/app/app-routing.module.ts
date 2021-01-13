import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {path: 'index', 
        loadChildren: ()=> import('./pages/public/index/index.module')
            .then(m => m.IndexModule) },
    {path: 'login', 
        loadChildren: ()=> import('./pages/public/login/login.module')
            .then(m => m.LoginModule) },
    {path: 'register', 
        loadChildren: ()=> import('./pages/public/singnup/singnup.module')
            .then(m => m.SingnupModule) },
    {path: 'home',  
        loadChildren: ()=> import('./pages/auth/home/home.module')
            .then(m => m.HomeModule) },
    {path: 'categories',  
        loadChildren: () => import('./pages/auth/categories/categories.module')
            .then(m => m.CategoriesModule)},
    {path: 'entries',  
        loadChildren: () => import('./pages/auth/entries/entries.module')
            .then(m => m.EntriesModule)},
    {path: 'properties',
        loadChildren: () => import('./pages/auth/properties/properties.module')
            .then(m => m.PropertiesModule)},
    {path: 'inventory',
        loadChildren: () => import('./pages/auth/inventory/inventory.module')
            .then(m => m.InventoryModule)},
    {path: 'invites', 
        loadChildren: () => import('./pages/auth/invites/invites.module')
            .then(m => m.InvitesModule)},
    {path: 'residents', 
        loadChildren: () => import('./pages/auth/residents/resident.module')
            .then(m => m.ResidentModule)},
    {path: 'profile',
        loadChildren: ()=> import('./pages/auth/user-profile/user-profile.module')
            .then(m => m.UserProfileModule)},
    {path: 'collective',
        loadChildren: ()=> import('./pages/auth/collective-entries/collective-entries.module')
            .then(m => m.CollectiveEntriesModule) },
    {path: 'reports',  
        loadChildren: () => import('./pages/auth/reports/reports.module')
            .then(m => m.ReportsModule)},
    {path: '', redirectTo: '/index', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
