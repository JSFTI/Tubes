import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class LoginNavShareService{
	private checkLoggedIn = new Subject<any>();
	
	sendLoginEvent(){
		this.checkLoggedIn.next();
	}
	
	getLoginEvent(){
		return this.checkLoggedIn.asObservable();
	}
}