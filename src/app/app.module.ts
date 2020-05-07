import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/components/login/login.component';
import { RegistrerComponent } from './security/components/registrer/registrer.component';
import { TempHomeComponent } from './security/components/temp-home/temp-home.component';
import { TempProfileComponent } from './security/components/temp-profile/temp-profile.component';
import { TempBoardAdminComponent } from './security/components/temp-board-admin/temp-board-admin.component';
import { TempBoardModeratorComponent } from './security/components/temp-board-moderator/temp-board-moderator.component';
import { TempBoardUserComponent } from './security/components/temp-board-user/temp-board-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent,
    TempHomeComponent,
    TempProfileComponent,
    TempBoardAdminComponent,
    TempBoardModeratorComponent,
    TempBoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
