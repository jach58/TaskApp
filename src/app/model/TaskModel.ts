import { TaskCategoryVO } from './../vo/taskCategoryVO';
import { CompletedOptionVO } from './../vo/CompletedOptionVO';
import { TaskVO } from '../vo/TaskVO';
import { Injectable } from '@angular/core';


@Injectable()
export class TaskModel {
    tasks: TaskVO[];
    taskCategories: TaskCategoryVO[];
    scheduledTasks: TaskVO[] = [];
    addedTasks: TaskVO[] = [];

    tasksCompletedOptions: CompletedOptionVO[] = [
        new CompletedOptionVO(-1, 'All', null),
        new CompletedOptionVO(0, 'Open Tasks', false),
        new CompletedOptionVO(1, 'Completed Tasks', true),
    ];

    onScheduleTaskRequest(task: TaskVO) {
      let found = false;
      for (let index = 0; index < this.scheduledTasks.length; index++) {
        if (this.scheduledTasks[index].taskID === task.taskID) {
          found = true;
          break;
        }
      } if (!found) {
        this.scheduledTasks.push(task);
        this.addedTasks.push(task);
      }
    }

    replaceTask(task: TaskVO): void {
      for (let index = 0; index < this.tasks.length; ++index) {
        if (this.tasks[index].taskID === task.taskID) {
          this.tasks[index] = task;
          break;
        }
      }
    }
}
