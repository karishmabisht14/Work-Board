import { ApiService } from 'src/core/providers/services/api.service';
import { ApiEndPoints } from 'src/core/providers/constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
@Injectable()
export class TaskService {
    tasks: any = null;
    constructor(private _apiService: ApiService, private _sharedService: SharedService) { }

    addTask(taskData: any): Observable<any> {
        return this._apiService
            .post(ApiEndPoints.addTask, taskData).pipe(map((data) => {
                if (data) {
                    if (this.tasks) {
                        if (this.tasks[data.currentStage]) {
                            this.tasks[data.currentStage].items.push(data);
                        } else {
                            this.tasks[data.currentStage] = {
                                count: 1,
                                items: [data]
                            }
                        }
                    } else {
                        this.tasks = {
                            [data.currentStage]: {
                                count: 1,
                                items: [data]
                            }
                        }
                    }
                }
                return data;
            }));
    }


    getUserTasks(categoryCode: string): Observable<any> {
        let queryParams = `?categoryCode=${categoryCode}`;
        return this._apiService
            .get(ApiEndPoints.userTasks + queryParams).pipe(map((data) => {
                if (data.length) {
                    this.setTasksData(data);
                }
                return data;
            }));
    }

    updateTask(taskData: any, id: string): Observable<any> {
        return this._apiService
            .put(`${ApiEndPoints.updateTask}/${id}`, taskData).pipe(map((data) => {
                return data;
            }));
    }

    deletTask(id: string): Observable<any> {
        return this._apiService
            .delete(`${ApiEndPoints.deleteTask}/${id}`).pipe(map((data) => {
                return data;
            }));
    }


    public setTasksData(data: any = []) {
        if (data.length) {
            const groupedData = this._sharedService.groupBy(data, 'currentStage');
            this.tasks = groupedData;
        }
        else this.tasks = null;
    }

    public resetTasks() {
        this.tasks = null;
    }

    public getTasksData() {
        return this.tasks;
    }

}
