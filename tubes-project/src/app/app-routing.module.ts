import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin.component';
import { AdminStudentProfListComponent } from './student-prof-list/student-prof-list-admin.component';

import { UserAuthGuard } from './_helper/userAuth.guard';
import { AdminAuthGuard } from './_helper/adminAuth.guard';

const routes: Routes = [
	{path : '', component: LoginComponent},
	{path : 'dashboard', component: DashboardComponent, canActivate:[UserAuthGuard]},
	{path : 'dashboardAdmin', component: DashboardAdminComponent, canActivate:[AdminAuthGuard], 
		children: [
			{path : '', redirectTo: 'list', pathMatch: 'full'},
			{path : 'list', component: AdminStudentProfListComponent}
		]},
	{path : '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
