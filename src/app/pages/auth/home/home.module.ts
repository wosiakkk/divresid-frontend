import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { LoginRoutingModule } from "./home-routing.module";
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ])

@NgModule({
  declarations: [HomeComponent],
  imports: [
    FullCalendarModule,
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    CardModule,
    
  ],
  exports: [
    CommonModule
], providers: [CurrencyPipe]
})
export class HomeModule { }
