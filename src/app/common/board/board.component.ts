import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesDown, faAnglesUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardCategoryService } from 'src/core/providers/services/boardCategory.service';
import { SharedService } from 'src/core/providers/services/shared.service';
import { AlertService } from 'src/core/providers/services/sweetAlert.service';
import { AddTaskComponent } from 'src/app/main/add-task/add-task.component';
import { TaskService } from 'src/core/providers/services/task.service';

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
  faAnglesUp = faAnglesUp;
  faAnglesDown = faAnglesDown;
  faTrash = faTrash;
  addedData: any = null;
  tasks: any = {};
  constructor(
    private router: Router,
    private _categoryService: BoardCategoryService,
    private modalService: NgbModal,
    private _sharedService: SharedService,
    private _alertService: AlertService,
    private _taskService: TaskService
  ) {
    this.routerData = this.router.getCurrentNavigation();
    this.allCategories = this._categoryService.categories;
    this.tasks = this._taskService.tasks;
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
      const modalRef = this.modalService.open(AddTaskComponent, {
        size: 'lg',
        centered: true,
      });
      modalRef.componentInstance.category = this.category;
    }
    else {
      this._alertService.showWarningAlert("Login Required!", 'Please Login to create Task!', false, 1500);
    }
  }

  getTaskClass(i: number) {
    return `stage-${i}`;
  }

  deletTask(task: any) {
    console.log("Delete task....", task);
  }
}
