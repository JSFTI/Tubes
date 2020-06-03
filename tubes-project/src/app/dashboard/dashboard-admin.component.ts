import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_service/auth.service';

@Component({
	selector: 'app-dashboard-admin',
	templateUrl: './dashboard-admin.component.html',
	styleUrls: ['./dashboard-admin.component.css']
})

export class DashboardAdminComponent implements OnInit{
	constructor(private authServive: AuthService){}
	
	ngOnInit(){
	
	}
}