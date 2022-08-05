import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { BoardCategoryService } from 'src/core/providers/services/boardCategory.service';
import { SharedService } from 'src/core/providers/services/shared.service';
import { AlertService } from 'src/core/providers/services/sweetAlert.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  routerData: any = null;
  category: any = null;
  allCategories: any = [];
  faPlus = faPlus;
  stages = [
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
    private _categoryService: BoardCategoryService,
    private modalService: NgbModal,
    private _sharedService: SharedService,
    private _alertService: AlertService
  ) {
    this.routerData = this.router.getCurrentNavigation();
    this.allCategories = this._categoryService.categories;
    // should log out 'bar'
  }

  ngOnInit(): void {
    if (this.routerData) {
      this.category = this.routerData.extras?.state?.category;
      if (!this.category && this.allCategories.length) {
        const categoryCode = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
        this.category = this.allCategories.find((e: any) => e.categoryCode == categoryCode);
      }
    }
  }

  openModal() {
    if (this._sharedService.isLoggedIn) {
      const modalRef = this.modalService.open(ModalComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.name = this.category.heading;
    }
    else {
      this._alertService.showWarningAlert("Login Required!", 'Please Login to create Task!', false, 1500);
    }

  }

  addCard = {};
}
