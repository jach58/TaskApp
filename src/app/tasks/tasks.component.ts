import { TaskschedulerComponent } from './../taskscheduler/taskscheduler.component';
import { TaskcuComponent } from './../taskcu/taskcu.component';
import { TaskFilterVO } from './../vo/TaskFilterVO';
import { TaskgridComponent } from './../taskgrid/taskgrid.component';
import { UserModel } from './../model/UserModel';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskVO } from '../vo/TaskVO';
import { TaskModel } from '../model/TaskModel';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild(TaskgridComponent) private taskgrid: TaskgridComponent;
  @ViewChild(TaskschedulerComponent) private taskscheduler: TaskschedulerComponent;

  public gridContainerStyle = 'horizontal-layout-94';
  public schedulerState = false;
  public schedulerShowButtonLabel = '<';


  constructor(private userModel: UserModel, private router: Router,
              private modalService: NgbModal, private taskModel: TaskModel ) { }

  ngOnInit(): void {
    if (!this.userModel.validateUser()) {
      this.router.navigate(['/login']);
    }

    if (this.userModel.isUserInRole(this.userModel.CREATOR_ROLE)) {
      this.gridContainerStyle = 'horizontal-layout-100';
    }

  }

  filterRequest(filter: TaskFilterVO): void {
    this.taskgrid.loadTasks(filter);
  }

  private openTaskWindow(title: string, task: TaskVO = null) {
    const modalRef = this.modalService.open(TaskcuComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      (result) => {
        if (!task) {
          this.taskModel.tasks.push(result[0]);
        } else {
          for (let index = 0; index < this.taskgrid.tasks.length; index++) {
            if (this.taskgrid.tasks[index].taskID === result[0].taskID) {
              this.taskgrid.tasks[index].description = result[0].description;
              this.taskgrid.tasks[index].taskCategory = result[0].taskCategory;
              this.taskgrid.tasks[index].taskCategoryID = result[0].taskCategoryID;
              break;
            }
          }
        }
      }).catch(
      (result) => {
        console.log(result);
        console.log('cancelling changes');
      }
    );
  }

  newTask(): void {
    this.openTaskWindow('Create a New Task');
  }

  editTask(task: TaskVO) {
    this.openTaskWindow('Edit Task', Object.assign({}, task));
  }

  onToggleScheduler(): void {
    if (this.schedulerState === true) {
      this.schedulerState = this.taskgrid.schedulerState = false;
      this.gridContainerStyle = 'horizontal-layout-94';
      this.schedulerShowButtonLabel = '<';
    } else {
      this.schedulerState = this.taskgrid.schedulerState = true;
      this.gridContainerStyle = 'horizontal-layout-60';
      this.schedulerShowButtonLabel = '>';
      this.taskscheduler.initalLoad(new Date());
    }

    setTimeout(() => {
      this.taskgrid.taskGrid.recalculate();
    }, 100);
  }

}
