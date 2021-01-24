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
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    ProgressBarModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  exports: [
    CommonModule
], providers: [CurrencyPipe]
})
export class HomeModule { }
