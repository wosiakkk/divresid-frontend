import { Component} from '@angular/core';

//refact
import { TokenStorageService } from "./security/services/token-storage.service";
import { AuthService } from "./security/services/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private tokenService: TokenStorageService, public authService: AuthService) { }





  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.authService.authenticate();
      this.authService.setUsername(this.tokenService.getUser().username);
      this.authService.setRoles(this.tokenService.getUser().roles);
    }
  }

 
}
