import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards = [];
  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getJsonData().subscribe((data:any) => {
      console.log('Data from file....', data);
      if (data && data.boards) {
        this.boards = data.boards;
        this.appService.setBoardsData(this.boards);
      }
    });
  }

  goto = (board: any) => {
    if (board.id.length) {
      let path = `boards/${board.id}`;
      this.router.navigate([path], { state: { board } });
    }
  };
}
