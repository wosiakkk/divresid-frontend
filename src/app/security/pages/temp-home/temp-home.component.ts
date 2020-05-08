import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-temp-home',
  templateUrl: './temp-home.component.html',
  styleUrls: ['./temp-home.component.css']
})
export class TempHomeComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
