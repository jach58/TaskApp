import { UserModel } from './../model/UserModel';
import { TaskModel } from './../model/TaskModel';
import { TaskService } from './../service/TaskService';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskVO } from '../vo/TaskVO';


@Component({
  selector: 'app-taskcu',
  templateUrl: './taskcu.component.html',
  styleUrls: ['./taskcu.component.css']
})

export class TaskcuComponent implements OnInit {
  @Input() title: string;
  @Input() task: TaskVO;

  taskUpdateError: string;

  constructor(private activeModal: NgbActiveModal, private taskService: TaskService,
              private userModel: UserModel, private taskModel: TaskModel) { }

  ngOnInit() {
    if (!this.task) {
      this.task = new TaskVO;
    }
  }

  onSave(): void {
    this.taskUpdateError = '';
    this.taskService.updateTask(this.task, this.userModel.user)
      .subscribe(
        result => {
          if (result.error) {
            this.taskUpdateError = 'There was a problem saving the task.';
            return;
          }
          this.activeModal.close(result.resultObject);
        },
        error => {
          this.taskUpdateError = 'There was a problem saving the task.';
        }
      );
  }

}
