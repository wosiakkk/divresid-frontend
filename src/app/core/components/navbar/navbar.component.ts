import { Component, OnInit } from '@angular/core';
import { faHouseDamage,faSignOutAlt,faUserCircle,faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from '../../../security/services/token-storage.service'
import { AuthService } from "../../../security/services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //icones
  faHouseDamage = faHouseDamage;
  faSignOutAlt = faSignOutAlt;
  faUserCircle = faUserCircle;
  faExpandAlt = faExpandAlt;

  constructor(
    public tokenStorageService: TokenStorageService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.tokenStorageService.signOut();
    this.authService.unauthenticate();
    this.router.navigate(['/login']);
  }

}
