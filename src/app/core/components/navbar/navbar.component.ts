import { Component, OnInit } from '@angular/core';
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from '../../../security/services/token-storage.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faHouseDamage = faHouseDamage;


  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;


currentUser: TokenStorageService;
constructor(private tokenStorageService: TokenStorageService) {
  tokenStorageService.itemValue.subscribe(currentUser => {
     this.currentUser = JSON.parse(currentUser);
    });
}



 // constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log('valor de isLoggedIn: '+ this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
