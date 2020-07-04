import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './security/interceptor/auth.interceptor'
import { FormsModule } from '@angular/forms';
import { AuthService } from './security/services/auth.service'
import { TokenStorageService } from './security/services/token-storage.service';
import { CoreModule } from "./core/core.module";
import { LoginModule } from './pages/public/login/login.module';
import { EntryReportComponent } from './pages/auth/reports/entry-report/entry-report.component';



@NgModule({
  declarations: [
    AppComponent,
    EntryReportComponent,
   
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    FormsModule,
    LoginModule
  ],
  providers: [authInterceptorProviders,AuthService,TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
