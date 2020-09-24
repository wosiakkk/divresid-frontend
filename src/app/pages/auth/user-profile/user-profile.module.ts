import { NgModule } from '@angular/core'
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component'
import { UserProfileRoutingModule } from './user-profile-routing.module'
import { SharedModule } from '../../../shared/shared.module'

@NgModule({
    declarations: [UserProfileViewComponent],
    imports: [UserProfileRoutingModule, SharedModule]
})
export class UserProfileModule { }