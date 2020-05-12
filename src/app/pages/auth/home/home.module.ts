import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { LoginRoutingModule } from "./home-routing.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule
  ],
  exports: [
    CommonModule
]
})
export class HomeModule { }
