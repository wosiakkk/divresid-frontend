import { Component } from '@angular/core';

//refact
import { TokenStorageService } from "./security/services/token-storage.service";
import { LoginService } from "./pages/public/login/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(private tokenService: TokenStorageService, private loginService: LoginService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.loginService.isLoggedIn = true;
    }
  }

 
}
