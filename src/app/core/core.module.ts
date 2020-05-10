import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [      
        NavbarComponent],
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
    ]
})
export class CoreModule { }