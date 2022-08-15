import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/core/providers/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Input() public category: any;
  @Input() public task: any;
  name: string = '';
  taskForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    taskStage: [1, Validators.required],
  });
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private _taskService: TaskService) { }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.get('name')?.setValue(this.task.name);
      this.taskForm.get('description')?.setValue(this.task.description);
      this.taskForm.get('taskStage')?.setValue(this.task.currentStage);
    }
  }

  onTaskSubmit() {
    let taskData = this.taskForm.getRawValue();
    if (this.task) {
      if (this.task.name === taskData.name) {
        delete taskData.name;
      }
      if (this.task.description === taskData.description) {
        delete taskData.description;
      }
      // update task
      this._taskService.updateTask(taskData, this.task._id).subscribe((result: any) => {
        if (result && !result.modifiedCount) {
          taskData = null;
        }
        this.activeModal.close(taskData);
      });
    } else {
      taskData.categoryCode = this.category.categoryCode;
      this._taskService.addTask(taskData).subscribe((result: any) => {
        this.activeModal.close();
      });
    }


  }

}
