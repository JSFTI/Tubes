import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../../_service/user.service';
import { User } from '../../../_model/user.model';

@Component({
	selector: 'app-list-student-admin',
	templateUrl: './list-student-admin.component.html',
	styleUrls: ['./list-student-admin.component.css']
})

export class AdminStudentListComponent implements OnInit{
	page : number = 0;
	pageList : Array;
	limit : number = 10;
	userLevel : number = 1;
	count : number = 0;
	search : string = "";
	users : User[] = [];
	detailUser : User;
	preTeks : string = "";
	
	constructor(
		private userService: UserService
	){}
	
	ngOnInit(){
		this.getTableData();
		this.userService.getUpdateTableEvent().subscribe(data => {
			this.getTableData();
		})
		this.pageList = Array(Math.ceil(this.count/this.limit)).fill().map((x, i) => i);
	}
	
	delaySearch;
	searchTabel(){
		clearTimeout(this.delaySearch);
		this.delaySearch = setTimeout(() => {
			this.getTableData();
		}, 500);
	}
	
	halamanLalu(){
		this.page--;
		this.getTableData();
	}
	
	ubahHalaman(hal: number){
		this.page = Math.ceil(hal) - 1;
		console.log(this.page);
	}
	
	halamanBerikut(){
		this.page++;
		this.getTableData();
	}
	
	getTableData(){
		this.userService.getTableData(this.page, this.limit, this.search, this.userLevel).subscribe(data => {
			this.users = data.User;
			this.count = data.Count;
			this.pageList = Array(Math.ceil(this.count/this.limit)).fill().map((x, i) => i);
		})
	}
	
	selectedUser(indeks: number){
		this.detailUser = JSON.parse(JSON.stringify(this.users[indeks]));
	}
	
	updateStatus(indeks: number){
		this.userService.updateTableData(this.users[indeks]).subscribe(data => {
			if(data.ok == 1){
				console.log("Update Berhasil");
			} else {
				console.log("Update Gagal");
			}
		})
	}
}