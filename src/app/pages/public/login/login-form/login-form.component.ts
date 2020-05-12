import { Component, OnInit } from '@angular/core';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../security/services/auth.service';
import { TokenStorageService } from '../../../../security/services/token-storage.service';
import { LoginService } from "../login.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  faUserShield = faUserShield;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
      private tokenStorage: TokenStorageService,
      private loginService: LoginService,
      private router : Router
      ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.loginService.isLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        this.loginService.isLoggedIn = true;
        if(this.loginService.redirectUrl != null){
          let backupUrl = this.loginService.redirectUrl;
          this.router.navigate([`${backupUrl}`]);
          console.log('entrou if, valor rota: '+ this.loginService.redirectUrl );
        }
        else{
          this.router.navigate(['/home']);
          console.log('não entrou if');
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.loginService.isLoggedIn = false;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
