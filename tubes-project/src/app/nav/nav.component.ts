import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../_service/auth.service';
import { LoginNavShareService } from '../_service/loginNavShare.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
	providers: [
		AuthService
	]
})

export class NavComponent implements OnInit{
	loginEventSubscription : Subscription;
	loginStatus : boolean;
	userLevel : number;
	
	constructor(
		private authService: AuthService,
		private shareService: LoginNavShareService,
		private router: Router
	){
		this.loginEventSubscription = this.shareService.getLoginEvent().subscribe(() => {
			this.changeLoginStatus();
		});
		if(this.authService.currentUserValue){
			this.changeLoginStatus();
			this.router.navigate(['/dashboard']);
		}
	}
	
	ngOnInit(){}
	
	changeLoginStatus(){
		this.loginStatus = true;
		this.userLevel = this.authService.getUserLevel();
	}
	
	logout(): void{
		this.authService.logoutUser();
		this.loginStatus = false;
		this.userLevel = null;
		this.router.navigate(['/']);
	}
}