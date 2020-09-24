import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component'
import { AuthGuard } from '../../../security/guards/auth/auth.guard'


const routes: Routes = [
    {path: '', component: UserProfileViewComponent,
        canActivate: [AuthGuard]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {}