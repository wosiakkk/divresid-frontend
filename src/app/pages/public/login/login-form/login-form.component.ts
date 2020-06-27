import { Component, OnInit } from '@angular/core';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { PublicService } from '../../public.service';
import { TokenStorageService } from '../../../../security/services/token-storage.service';
import { Router } from "@angular/router";
import { AuthService } from "../../../../security/services/auth.service";
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';


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
      private publicService: PublicService,
      private authService: AuthService,
      private router : Router,
      private toastMessages: ToastMessagesService
    ) { }

  ngOnInit() {
   
  }

  onSubmit() {
    this.publicService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.authService.setRoles(this.tokenStorage.getUser().roles);
        this.authService.authenticate();
        this.authService.setUsername(this.tokenStorage.getUser().username);
        this.authService.setName(this.tokenStorage.getUser().name);

        if(this.publicService.redirectUrl != null){
          let backupUrl = this.publicService.redirectUrl;
          this.router.navigate([`${backupUrl}`]);
        }
        else{
          this.toastMessages.loadWelcomeMessageToast();  
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
