import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../security/services/auth.service";
import * as $ from 'jquery';
import { 
  faHandHoldingUsd,
  faHome,
  faCommentsDollar, 
  faUsers, 
  faFileInvoice, 
  faIdBadge, 
  faCogs,   
  faCubes
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

   //icones
   faHandHoldingUsd = faHandHoldingUsd;
   faHome = faHome;
   faCommentsDollar = faCommentsDollar;
   faUsers = faUsers;
   faFileInvoice = faFileInvoice;
   faIdBadge = faIdBadge;
   faCogs = faCogs;
   faCubes = faCubes;
  

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
   
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