import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardCategoryService } from 'src/core/providers/services/boardCategory.service';
import { SharedService } from 'src/core/providers/services/shared.service';
import { AlertService } from 'src/core/providers/services/sweetAlert.service';
import { AddTaskComponent } from 'src/app/main/add-task/add-task.component';
import { TaskService } from 'src/core/providers/services/task.service';
import { MessageConstants } from 'src/core/providers/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  routerData: any = null;
  category: any = null;
  allCategories: any = [];
  Icons = Icons;
  addedData: any = null;
  tasks: any = {};
  selectedTask: any = null;
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

  openModal(updateMode = false) {
    if (this._sharedService.isLoggedIn) {
      const modalRef = this.modalService.open(AddTaskComponent, {
        size: 'lg',
        centered: true,
      });
      modalRef.componentInstance.category = this.category;
      if (updateMode && this.selectedTask) {
        modalRef.componentInstance.task = this.selectedTask;
      }
      modalRef.result.then(data => {
        if (data) {
          this.updateLocaltask(data);
        } else {
          this.tasks = this._taskService.tasks
        }
      }).catch(err => { });
    } else {
      this._alertService.showWarningAlert("Login Required!", 'Please Login to create Task!', false, 1500);
    }
  }

  getTaskClass(i: number) {
    return `stage-${i}`;
  }

  deletTask() {
    this._alertService.confirm(MessageConstants.deleteConfirmHeading,
      MessageConstants.deleteConfirmSubheading, MessageConstants.deleteConfrimBtnText).then((confirmation => {
        if (confirmation) {
          this._taskService.deletTask(this.selectedTask._id).subscribe((result: any) => {
            if (result && result.success) {
              const taskIndex = this.tasks[this.selectedTask.currentStage].items.findIndex((task: any) => task._id === this.selectedTask._id);
              this.tasks[this.selectedTask.currentStage].items.splice(taskIndex, 1);
            }
          });
        }
      }))

  }

  updateTask(action: number) {
    switch (action) {
      case 0: {
        this.openModal(true);
      }
        break;
      case 1: {
        this.moveTask(this.selectedTask.currentStage + 1);
      }
        break;
      case -1: {
        this.moveTask(this.selectedTask.currentStage - 1);
      }
        break;
    }
  }

  archiveTask() {
    if (this.selectedTask.currentStage == 4) {
      const taskData = {
        isArchive: true
      }
      this._alertService.confirm(MessageConstants.archiveConfirmHeading,
        MessageConstants.archiveConfirmSubheading).then((confirmation => {
          if (confirmation) {
            this._taskService.updateTask(taskData, this.selectedTask._id).subscribe((result: any) => {
              if (result && result.modifiedCount) {
                const taskIndex = this.tasks[this.selectedTask.currentStage].items.findIndex((task: any) => task._id === this.selectedTask._id);
                this.tasks[this.selectedTask.currentStage].items.splice(taskIndex, 1);
              }
            });
          }
        }));

    }
  }

  toggleTaskSelection(task: any) {
    if (this.selectedTask && this.selectedTask._id === task._id) {
      this.selectedTask = null;
    } else {
      this.selectedTask = task;
    }
  }

  toggleTaskExpansion(event: any, task: any) {
    event.stopPropagation();
    task.expand = !task.expand;
  }

  moveTask(stage: number) {
    if (stage < 1 || stage > 4) {
      return this._alertService.showWarningAlert("Invalid Task Move", 'Cannot be moved further', false, 1500);
    }
    const taskData = {
      currentStage: stage
    }
    this._taskService.updateTask(taskData, this.selectedTask._id).subscribe((result: any) => {
      if (result && result.modifiedCount) {
        const taskIndex = this.tasks[this.selectedTask.currentStage].items.findIndex((task: any) => task._id === this.selectedTask._id);
        if (taskIndex !== -1) {
          this.tasks[this.selectedTask.currentStage].items.splice(taskIndex, 1);
          const newTask = { ...this.selectedTask, ...taskData };
          if (this.tasks[stage] && this.tasks[stage].items) {
            this.tasks[stage].items.push(newTask);
          } else if (this.tasks[stage]) {
            this.tasks[stage]["items"] = [newTask];
          } else {
            this.tasks[`${stage}`] = {
              items: [newTask]
            };
          }
          this.selectedTask = newTask;
        }
      }
    });
  }

  updateLocaltask(task: any) {
    this.selectedTask = { ...this.selectedTask, ...task };
    const taskIndex = this.tasks[this.selectedTask.currentStage].items.findIndex((task: any) => task._id === this.selectedTask._id);
    if (taskIndex !== -1) {
      this.tasks[this.selectedTask.currentStage].items[taskIndex] = this.selectedTask;
    }
  }
}
