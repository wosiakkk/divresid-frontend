import { Component, OnInit } from '@angular/core';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';
import { TokenStorageService } from '../../../../security/services/token-storage.service';
import { Router } from "@angular/router";
import { AuthService } from "../../../../security/services/auth.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  faUserShield = faUserShield;

  form: any = {};
  isLoginFailed = false;
  errorMessage = '';

  constructor( 
      private tokenStorage: TokenStorageService,
      private loginService: LoginService,
      private authService: AuthService,
      private router : Router
    ) { }

  ngOnInit() {
   
  }

  onSubmit() {
    this.loginService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.authService.setRoles(this.tokenStorage.getUser().roles);
        this.authService.authenticate();
        this.authService.setUsername(this.tokenStorage.getUser().username);

        if(this.loginService.redirectUrl != null){
          let backupUrl = this.loginService.redirectUrl;
          this.router.navigate([`${backupUrl}`]);
        }
        else{
          this.router.navigate(['/home']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.authService.unauthenticate();
      }
    );
  }

}
