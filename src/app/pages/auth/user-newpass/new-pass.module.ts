import { NgModule } from '@angular/core'
import { SharedModule } from '../../../shared/shared.module'
import { NewPassFormComponent } from './new-pass-form/new-pass-form.component'
import { NewPassRoutingModule } from './new-pass-routing.module'

@NgModule({
    declarations: [NewPassFormComponent],
    imports: [NewPassRoutingModule,SharedModule]
})
export class NewPassModule {}