import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { User } from '../../../_model/user.model';
import { UserService } from '../../../_service/user.service';

@Component({
	selector: 'app-add-student',
	templateUrl: './add-student.component.html',
	styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit{
	pipe = new DatePipe('en-US');
	
	user: User = {
		UserLevel: 1
	}
	
	constructor(
		private userService: UserService
	){}
	
	ngOnInit(){
		this.user.Nomor = "";
		this.user.Nik = "";
		this.user.Email = "";
	}
	
	uploadFoto(event){
		const reader = new FileReader();
		if(event.target.files && event.target.files.length){
			const [file] = event.target.files;
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.user.ProfilePicture = reader.result;
			}
		}
	}
	
	addData(form: NgForm){
		if(form.invalid){
			console.log("form invalid");
			return;
		}
		this.user.Status = true;
		this.user.Password = this.pipe.transform(this.user.TanggalLahir, 'ddMMyyyy').toString();
		this.user.TanggalDaftar = new Date();
		this.userService.registerUser(this.user).subscribe(data => {
			if(data.Success){
				console.log("Berhasil mendaftarkan mahasiswa");
				this.userService.sendUpdateTableEvent();
				this.user = {
					UserLevel : 1
				};
				form.reset();
				this.user.Nomor = "";
				this.user.Nik = "";
				this.user.Email = "";
			} else {
				console.log("Pendaftaran gagal");
			}
		})
	}
}