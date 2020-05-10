import { NgModule } from '@angular/core';
import { IndexComponent } from "./index/index.component";
import { IndexRoutingModule } from "./index-routing.module";

@NgModule({
    declarations:[
        IndexComponent
    ],
    imports: [
        IndexRoutingModule
    ]
})
export class IndexModule {}