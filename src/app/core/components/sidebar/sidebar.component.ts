import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../security/services/auth.service";
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { TokenStorageService } from '../../../security/services/token-storage.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

   //icones
   faHouseDamage = faHouseDamage;

  isAdmin:boolean = false;
  isMod:boolean = false;
  roles:any[] = this.tokenStorage.currentUser.roles;

  constructor(public authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    //check roles
    this.roles.forEach(element => {
      if(element == "ROLE_ADMIN")
        this.isAdmin=true;
      else if (element == "ROLE_MODERATOR")
        this.isMod = true;
    });;

    //Toggle Click Function
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function (e) {
          e.preventDefault();
          $('#wrapper').toggleClass('toggled');
          $(this).toggleClass('active');
      });
    });
  }

}
