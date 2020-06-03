import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../_service/auth.service';

@Injectable({
	providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate{
	constructor(
		private router: Router,
		private authService: AuthService
	){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		if(this.authService.isLoggedIn() && this.authService.getUserLevel() == 0){
			return true;
		}
		if(!this.authService.isLoggedIn()){
			this.router.navigate(['/']);
			return false;
		}
		if(this.authService.getUserLevel() != 0){
			this.router.navigate(['/dashboard']);
			return false;
		}
		this.router.navigate(['/']);
		return false;
	}
}