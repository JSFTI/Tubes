import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn : 'root'
})

export class AuthService{
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
	
	constructor(private http: HttpClient){
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
		this.currentUser = this.currentUserSubject.asObservable();
	}
	
	backendUrl = "http://localhost:3000/";
	
	httpOptions = {
		headers : new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
	
	public get currentUserValue(): any{
		return this.currentUserSubject.value;
	}
	
	login(user: any): Observable<any>{
		const backendUrl = this.backendUrl + "users/login";
		return this.http.post(backendUrl, user, this.httpOptions)
			.pipe(map(resData => resData));
	}
	
	isLoggedIn(){
		let user = localStorage.getItem('user');
		if(user){
			return true;
		}
		return false;
	}
	
	storeUser(user){
		localStorage.setItem('user', JSON.stringify(user));
		this.currentUserSubject.next(user);
	}
	
	logoutUser(): void{
		localStorage.removeItem('user');
	}
	
	getUserLevel(): number{
		let user = JSON.parse(localStorage.getItem('user'));
		return user.userLevel;
	}
}