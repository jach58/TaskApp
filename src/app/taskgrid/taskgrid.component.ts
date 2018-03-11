import { UserModel } from './../model/UserModel';
import { TaskService } from './../service/TaskService';
import { TaskModel } from './../model/TaskModel';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild} from '@angular/core';
import { TaskVO } from '../vo/TaskVO';
import { TaskFilterVO } from '../vo/TaskFilterVO';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-taskgrid',
  templateUrl: './taskgrid.component.html',
  styleUrls: ['./taskgrid.component.css']
})
export class TaskgridComponent implements OnInit {
  @ViewChild(DatatableComponent) taskGrid: DatatableComponent;

  tasks: TaskVO[];
  taskLoadError = '';
  public schedulerState = false;

  @Output() editTaskRequest = new EventEmitter<TaskVO>();

  constructor(private taskModel: TaskModel, private taskService: TaskService,
    private userModel: UserModel) { }


  loadTasks(taskFilter: TaskFilterVO): void {
    this.taskLoadError = '';
    this.taskService.loadTasks(taskFilter)
      .subscribe(
        result => {
          if (result.error) {
            this.taskLoadError = 'We could not load any tasks';
            return;
          }
          this.tasks = this.taskModel.tasks = result.resultObject as TaskVO[];
        },
        error => {
          this.taskLoadError = 'We had an error loading tasks.';
        }
      );
  }

  ngOnInit(): void {
    const taskFilter: TaskFilterVO = new TaskFilterVO();
    taskFilter.completed = false;
    taskFilter.startDate = new Date('3/1/2017');
    this.loadTasks(taskFilter);
  }

  onEditTask(value: any): void {
    this.editTaskRequest.emit(value);
  }

  onScheduleTaskRequest(task: any): void {
    this.taskModel.onScheduleTaskRequest(task);
  }

  onCompletedCheckBoxChange(task: TaskVO): void {
    this.taskLoadError = '';
    this.taskService.completeTask(task).subscribe(
      result => {
        if (result.error) {
          this.taskLoadError = 'Error completing the task.';
          return;
        }
        this.taskModel.replaceTask(result.resultObject[0]);
      },
      error => {
        console.log('task service error loading tasks');
        this.taskLoadError = 'We had an error saving the tasks.';
      }
    );
  }

}
