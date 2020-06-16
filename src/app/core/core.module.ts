import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from '../security/services/auth.service'


@NgModule({
    declarations: [      
        NavbarComponent, SidebarComponent],
    imports: [
        CommonModule,
        FontAwesomeModule ,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule   
    ],
    exports: [
        //modulos compartilhados
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,

        //componentes compartilhados
        NavbarComponent,
        SidebarComponent
    ],

})
export class CoreModule { }