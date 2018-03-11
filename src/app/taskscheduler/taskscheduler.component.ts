import { TaskFilterVO } from './../vo/TaskFilterVO';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './../service/TaskService';
import { Component, OnInit } from '@angular/core';
import { TaskVO } from '../vo/TaskVO';
import { TaskModel } from '../model/TaskModel';


@Component({
  selector: 'app-taskscheduler',
  templateUrl: './taskscheduler.component.html',
  styleUrls: ['./taskscheduler.component.css']
})
export class TaskschedulerComponent implements OnInit {
  schedulerDate: NgbDateStruct;
  schedulerError: string;

  constructor(private taskService: TaskService, private taskModel: TaskModel) { }

  ngOnInit() {
  }

  initalLoad(schedulerDate: Date): void {
    const taskFilter: TaskFilterVO = new TaskFilterVO();
    taskFilter.scheduledEqualDate = new Date();
    this.schedulerDate = {
      day: taskFilter.scheduledEqualDate.getUTCDate(),
      month: taskFilter.scheduledEqualDate.getUTCMonth() + 1,
      year: taskFilter.scheduledEqualDate.getUTCFullYear()
    };
    this.loadTasks(taskFilter);
  }

  loadTasks(taskFilter: TaskFilterVO): void {
    this.schedulerError = '';
    this.taskService.loadTasks(taskFilter).subscribe(
      result => {
        if (result.error) {
          this.schedulerError = 'We could not load any tasks.';
          return;
        }
        this.taskModel.scheduledTasks = result.resultObject as TaskVO[];
        this.taskModel.scheduledTasks = this.taskModel.scheduledTasks
          .concat(this.taskModel.addedTasks);
      },
      error => {
        console.log('task service error loading tasks');
        this.schedulerError = 'We had an error loading tasks.';
      }
    );
  }

  onScheduleDateChange(): void {
    console.log(this.schedulerDate);
    if (this.schedulerDate.year) {
      const taskFilter: TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEqualDate = new Date(this.schedulerDate.month + '/' +
                            this.schedulerDate.day + '/' + this.schedulerDate.year);
      console.log(taskFilter);
      this.loadTasks(taskFilter);
    }
  }

  onTaskUnschedule(task: TaskVO): void {
    if (task.dateScheduled) {
      task.dateScheduled = null;
      this.scheduleTask(task);
    } else {
      this.deleteTaskFromSchedule(task);
    }
  }

  deleteTaskFromSchedule(task: TaskVO): void {
    let itemIndex: number = this.taskModel.scheduledTasks.indexOf(task);
    if (itemIndex >= 0) {
      this.taskModel.scheduledTasks.splice(itemIndex, 1);
    }
    itemIndex = this.taskModel.addedTasks.indexOf(task);
    if (itemIndex >= 0) {
      this.taskModel.addedTasks.splice(itemIndex, 1);
    }
  }

  scheduleTask(task: TaskVO): void {
    this.schedulerError = '';
    this.taskService.scheduleTask(task).subscribe(
      result => {
        if (result.error) {
          this.schedulerError = 'We could not remove the task from the schedule.';
          return;
        }
        this.taskModel.replaceTask(result.resultObject[0]);
        for (let index = 0; index < this.taskModel.scheduledTasks.length; ++index) {
          if (this.taskModel.scheduledTasks[index].taskID === result.resultObject[0].taskID) {
            this.deleteTaskFromSchedule(this.taskModel.scheduledTasks[index]);
          }
        }
      },
      error => {
        this.schedulerError = 'We had an error scheduling the tasks.';
      }
    );
  }

  onTaskListSchedule() {
    const localDate: Date = new Date(this.schedulerDate.month + '/' + this.schedulerDate.day + '/' +
      this.schedulerDate.year);
    this.taskService.scheduleTaskList(this.taskModel.scheduledTasks, localDate).subscribe(
      result => {
        if (result.error === true) {
          this.schedulerError = 'We had an error scheduling all the tasks.';
          return;
        }
        for (let scheduledTaskIndex = 0; scheduledTaskIndex < this.taskModel.scheduledTasks.length; scheduledTaskIndex++) {
          for (let masterTaskIndex = 0; masterTaskIndex < this.taskModel.tasks.length; masterTaskIndex++) {
            if (this.taskModel.tasks[masterTaskIndex].taskID === this.taskModel.scheduledTasks[scheduledTaskIndex].taskID) {
              this.taskModel.tasks[masterTaskIndex].dateScheduled = localDate;
              break;
            }
          }
        }
        this.taskModel.addedTasks = [];

      }, error => {
        console.log('We had an error scheduling all the tasks.');
        this.schedulerError = 'We had an error scheduling all the tasks.';
      }
    );
  }

}
