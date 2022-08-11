import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskDataResolver implements Resolve<any> {
    constructor(private _taskService: TaskService, private _sharedService: SharedService) { }
    resolve(route: ActivatedRouteSnapshot) {
        let token = this._sharedService.getItem('auth-token');
        if (this._taskService.tasks == null && token) {
            return this._taskService.getUserTasks(route.params["id"]);
        } else {
            return this._taskService.tasks;
        }
    }
}