import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  routerData: any = null;
  boardData: any = null;
  faPlus = faPlus;
  cards = [
    {
      heading: 'BACKLOG',
      bg: 'grey',
    },
    {
      heading: 'TO DO',
      bg: 'skyblue',
    },
    {
      heading: 'IN PROGRESS',
      bg: 'orange',
    },
    {
      heading: 'COMPLETE',
      bg: 'green',
    },
  ];
  addedData: any = null;

  constructor(
    private router: Router,
    private appService: AppService,
    private modalService: NgbModal
  ) {
    this.routerData = this.router.getCurrentNavigation();
    // should log out 'bar'
  }

  ngOnInit(): void {
    if (this.routerData) {
      this.boardData = this.routerData.extras?.state?.board;
      if (!this.boardData) {
        this.appService.getJsonData().subscribe((data) => {
          let id = this.router.url.substring(
            this.router.url.lastIndexOf('/') + 1
          );
          if (data && data.boards && id) {
            this.boardData = data.boards.find((e: any) => e.id == id);
          }
        });
      }
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.name = this.boardData.heading;
  }

  addCard = {};
}
