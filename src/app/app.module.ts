import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* ************************BASE DE SEGURANÇA PARA TESTE A SER REFATORADA **********************/
import { LoginComponent } from './security/pages/login/login.component';
import { RegistrerComponent } from './security/pages/registrer/registrer.component';
import { TempHomeComponent } from './security/pages/temp-home/temp-home.component';
import { TempProfileComponent } from './security/pages/temp-profile/temp-profile.component';
import { TempBoardAdminComponent } from './security/pages/temp-board-admin/temp-board-admin.component';
import { TempBoardModeratorComponent } from './security/pages/temp-board-moderator/temp-board-moderator.component';
import { TempBoardUserComponent } from './security/pages/temp-board-user/temp-board-user.component';
import { authInterceptorProviders } from './security/interceptor/auth.interceptor'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoreModule } from "./core/core.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent,
    TempHomeComponent,
    TempProfileComponent,
    TempBoardAdminComponent,
    TempBoardModeratorComponent,
    TempBoardUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    FontAwesomeModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
