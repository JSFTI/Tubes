import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_service/auth.service';
import { LoginNavShareService } from '../_service/loginNavShare.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [
		AuthService
	]
})

export class LoginComponent{
	nomor: string;
	password: string;
	
	constructor(
		private authService: AuthService,
		private shareService: LoginNavShareService,
		private router: Router
	){}
	
	loginUser(): void{
		let testUser = {
			nomor: this.nomor,
			password: this.password
		};
		this.authService.login(testUser).subscribe(resData => {
			if(resData.success){
				let user = {
					token : resData.token,
					nomor: resData.nomor,
					userLevel: resData.userLevel
				}
				this.authService.storeUser(user);
				this.shareService.sendLoginEvent();
				this.router.navigate(['./dashboard']);
			}
		});
	}
}