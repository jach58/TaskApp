import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/AuthenticationService';
import { UserModel } from './model/UserModel';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskModel } from './model/TaskModel';
import { TaskgridComponent } from './taskgrid/taskgrid.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './service/TaskService';
import { TaskfilterComponent } from './taskfilter/taskfilter.component';
import { TaskcuComponent } from './taskcu/taskcu.component';
import { TaskschedulerComponent } from './taskscheduler/taskscheduler.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskgridComponent,
    TasksComponent,
    TaskfilterComponent,
    TaskcuComponent,
    TaskschedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthenticationService,
    UserModel,
    TaskModel,
    TaskService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskcuComponent]
})
export class AppModule { }
