import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../security/guards/auth/auth.guard'
import { NewPassFormComponent } from './new-pass-form/new-pass-form.component'


const routes: Routes = [
    {path: '', component: NewPassFormComponent,
        canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewPassRoutingModule {}