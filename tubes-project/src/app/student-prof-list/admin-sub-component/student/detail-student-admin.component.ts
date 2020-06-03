import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../../_model/user.model';
import { UserService } from '../../../_service/user.service';

@Component({
	selector: 'app-detail-student-admin',
	templateUrl: './detail-student-admin.component.html',
	styleUrls: ['./detail-student-admin.component.css']
})

export class AdminStudentDetailComponent{
	update : boolean = false;
	@Input() user;

	constructor(
		private userService: UserService
	){}
	
	ngOnInit(){
		this.user = {
			UserLevel : 1,
			Nomor : "0",
			Nama : "0",
			Password : "0",
			Email : "0",
			Alamat : "0",
			Nik : "0",
			TempatLahir : "0",
			TanggalLahir : new Date('0'),
			Agama : -1,
			JenisKelamin : -1,
			AsalSekolah : "0",
			TanggalDaftar : new Date('0'),
			Ayah : "0",
			Ibu : "0",
			AlamatOrtu : "0",
			WargaNegara : "0",
			Status : false,
		};
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
	
	updatef(form: NgForm){
		if(form.invalid){
			console.log("Form invalid");
			return;
		}
		this.userService.updateTableData(this.user).subscribe(data => {
			if(data.ok == 1){
				console.log("Update Berhasil");
				this.userService.sendUpdateTableEvent();
			} else {
				console.log("Update Gagal");
			}
		})
	}
	
	hapusf(){
		this.userService.hapusTableData(this.user._id).subscribe(data => {
			if(data.ok == 1){
				console.log("Delete Berhasil");
				this.userService.sendUpdateTableEvent();
			} else {
				console.log("Delete Gagal");
			}
		})
	}
}