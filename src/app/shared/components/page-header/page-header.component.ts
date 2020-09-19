import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle, faAngleDoubleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faEdit = faEdit;

  @Input('page-title') pageTitle: string;
  @Input('page-sub-title') pageSubTitle: string;
  @Input('page-new-button-text') pageNewButtonText: string;
  @Input('page-button-link') pageButtonLink: string;
  @Input('icon-button') iconButton:string;


  constructor() { }

  ngOnInit(): void {

  }

}
