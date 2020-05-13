import { Component, OnInit } from '@angular/core';
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from '../../../security/services/token-storage.service'
import { AuthService } from "../../../security/services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //icones
  faHouseDamage = faHouseDamage;

  constructor(public tokenStorageService: TokenStorageService, public authService: AuthService) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.tokenStorageService.signOut();
    this.authService.unauthenticate();
  }

}
