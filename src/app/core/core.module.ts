import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { DashComponent } from './components/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatTreeModule} from '@angular/material/tree';
import { SidebarItensComponent } from './components/sidebar-itens/sidebar-itens.component'




@NgModule({
    declarations: [      
        NavComponent,
        DashComponent,
        SidebarItensComponent
    ],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatTreeModule
    ],
    exports: [
        CommonModule,
        NavComponent,
        MatMenuModule,
        DashComponent,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        SidebarItensComponent,
        MatTreeModule
    ]
})
export class CoreModule { }