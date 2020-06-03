import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../_model/user.model';

@Component({
	selector: 'app-student-prof-list-admin',
	templateUrl: './student-prof-list-admin.component.html',
	styleUrls: ['./student-prof-list-admin.component.css']
})

export class AdminStudentProfListComponent implements OnInit{
	pilihData: number;
	
	constructor(){}
	
	ngOnInit(){
		
	}
	
	pilihanData(pilihan: number){
		this.pilihData = pilihan;
	}
}