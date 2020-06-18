import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('page-sub-title') pageSubTitle: string;
  @Input('page-new-button-text') pageNewButtonText: string;
  @Input('page-button-link') pageButtonLink: string;


  constructor() { }

  ngOnInit(): void {
  }

}
