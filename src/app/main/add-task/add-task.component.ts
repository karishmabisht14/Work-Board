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
  name: string = '';
  taskForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    taskStage: [1, Validators.required],
  });
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private _taskService: TaskService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  onTaskSubmit() {
    console.log(this.taskForm.value);
    let taskData = this.taskForm.getRawValue();
    taskData.categoryCode = this.category.categoryCode;
    this._taskService.addTask(taskData).subscribe((result: any) => {
      this.activeModal.close();
    });

  }

}
