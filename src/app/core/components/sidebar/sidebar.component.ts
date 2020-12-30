import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../security/services/auth.service";
import * as $ from 'jquery';
import { 
  faHandHoldingUsd,
  faHome,
  faCommentsDollar, 
  faUsers,
  faUserPlus, 
  faFileInvoice, 
  faIdBadge, 
  faCogs,   
  faCubes,
  faFileInvoiceDollar,
  faMoneyBillAlt,
  faCity,
  faBuilding,
  faMailBulk,
  faIdCard,
  faClipboardList,
  faExclamationCircle,
  faMoneyCheckAlt
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
   faUserPlus = faUserPlus;
   faFileInvoice = faFileInvoice;
   faIdBadge = faIdBadge;
   faCogs = faCogs;
   faCubes = faCubes;
   faFileInvoiceDollar = faFileInvoiceDollar;
   faMoneyBillAlt = faMoneyBillAlt;
   faCity = faCity;
   faBuilding = faBuilding;
   faMailBulk = faMailBulk;
   faIdCard = faIdCard;
   faClipboardList = faClipboardList;
   faExclamationCircle = faExclamationCircle;
   faMoneyCheckAlt = faMoneyCheckAlt;

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
