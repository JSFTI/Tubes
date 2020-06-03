import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin.component';
import { AdminStudentProfListComponent } from './student-prof-list/student-prof-list-admin.component';
import { AddStudentComponent } from './student-prof-list/admin-sub-component/student/add-student.component'
import { AdminStudentListComponent } from './student-prof-list/admin-sub-component/student/list-student-admin.component';
import { AdminStudentDetailComponent } from './student-prof-list/admin-sub-component/student/detail-student-admin.component';

import { AuthService } from './_service/auth.service';
import { LoginNavShareService } from './_service/loginNavShare.service';
import { UserService } from './_service/user.service';

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
	NavComponent,
	DashboardAdminComponent,
	DashboardComponent,
	AdminStudentProfListComponent,
	AddStudentComponent,
	AdminStudentListComponent,
	AdminStudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule
  ],
  providers: [
	AuthService,
	LoginNavShareService,
	UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
