import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-temp-board-user',
  templateUrl: './temp-board-user.component.html',
  styleUrls: ['./temp-board-user.component.css']
})
export class TempBoardUserComponent implements OnInit {

  
  content = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
