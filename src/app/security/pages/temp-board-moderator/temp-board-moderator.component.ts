import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-temp-board-moderator',
  templateUrl: './temp-board-moderator.component.html',
  styleUrls: ['./temp-board-moderator.component.css']
})
export class TempBoardModeratorComponent implements OnInit {


  content = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
