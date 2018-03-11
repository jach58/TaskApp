import { TaskFilterVO } from './../vo/TaskFilterVO';
import { TaskModel } from './../model/TaskModel';
import { TaskService } from './../service/TaskService';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskCategoryVO } from '../vo/taskCategoryVO';


@Component({
  selector: 'app-taskfilter',
  templateUrl: './taskfilter.component.html',
  styleUrls: ['./taskfilter.component.css']
})
export class TaskfilterComponent implements OnInit {
  filterError: string;
  completed: string;
  taskFilter = new TaskFilterVO();
  taskCategories = [];

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  scheduledStartDate: NgbDateStruct;
  scheduledEndDate: NgbDateStruct;

  @Output() filterRequest = new EventEmitter<TaskFilterVO>();
  @Output() newTaskRequest = new EventEmitter();

  constructor(private taskService: TaskService, private taskModel: TaskModel) {}

  ngOnInit() {
    this.completed = 'false';
    this.loadTaskCategories();
  }

  loadTaskCategories(): void {
    this.taskService.loadTaskCategories().subscribe(
      result => {
        if (result.error) {
          this.filterError = 'Error loading task Categories';
          return;
        }
        this.taskModel.taskCategories = result.resultObject as TaskCategoryVO[];
        this.taskCategories = Object.assign([], this.taskModel.taskCategories);
        const allTask = new TaskCategoryVO();
        allTask.taskCategoryID = 0;
        allTask.taskCategory = 'All Categories';
        this.taskCategories.unshift(allTask);
        this.taskFilter.taskCategoryID = 0;
      },
      error => {
        this.filterError = 'There was a task category service error';
      }
    );
  }

  filter(): void {
    const taskFilter: TaskFilterVO = new TaskFilterVO();
    if (this.startDate) {
      taskFilter.startDate = new Date(this.startDate.month + '/' +
        this.startDate.day + '/' +
        this.startDate.year);
    } else {
      taskFilter.startDate = null;
    }

    if (this.endDate) {
      taskFilter.endDate = new Date(this.endDate.month + '/' +
        this.endDate.day + '/' + this.endDate.year);
    } else {
      taskFilter.endDate = null;
    } if (
      this.scheduledStartDate) {
      taskFilter.scheduledStartDate = new
        Date(this.scheduledStartDate.month +
        '/' + this.scheduledStartDate.day +
        '/' + this.scheduledStartDate.year);
    } else {
      taskFilter.scheduledStartDate = null;
    } if (
      this.scheduledEndDate) {
      taskFilter.scheduledEndDate = new Date(this.scheduledEndDate.month
        + '/' +
        this.scheduledEndDate.day + '/' +
        this.scheduledEndDate.year);
    } else {
      taskFilter.scheduledEndDate = null;
    }
    console.log('this.completed', this.completed);
    if (this.completed === 'null') {
      taskFilter.completed = null;
    } else if (this.completed === 'false') {
      taskFilter.completed = false;
    } else {
      taskFilter.completed = true;
    }
    taskFilter.taskCategoryID = Number(this.taskFilter.taskCategoryID);
    this.filterRequest.emit(taskFilter);
  }

  newTask(): void {
    this.newTaskRequest.emit();
  }

}
