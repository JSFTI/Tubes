import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/user.model';

@Injectable({
	providedIn: 'root'
})

export class UserService{
	eventUpdateTabel = new Subject<any>();
	
	constructor(private http: HttpClient){}
	
	httpOptions = {
		headers : new HttpHeaders({
			'Content-Type':'application/json'
		}),
		params : new HttpParams({})
	}
	
	serverUrl = "http://localhost:3000/users/";
	
	registerUser(user: User): Observable<any>{
		return this.http.post(this.serverUrl + "register", {data: JSON.stringify(user)}, this.httpOptions)
			.pipe(map(res => res));
	}
	
	getTableData(page: number, limit: number, search: string, userLevel: number): Observable<any>{
		search.trim();
		this.httpOptions.headers = this.httpOptions.headers.set('Authorization', JSON.parse(localStorage.getItem('user')).token);
		this.httpOptions.params = this.httpOptions.params.set('page', String(page));
		this.httpOptions.params = this.httpOptions.params.set('limit', String(limit));
		this.httpOptions.params = this.httpOptions.params.set('search', search);
		this.httpOptions.params = this.httpOptions.params.set('userLevel', String(userLevel));
		return this.http.get<User[]>(this.serverUrl + "listAdmin", this.httpOptions)
			.pipe(map(res => res));
	}
	
	sendUpdateTableEvent(){
		this.eventUpdateTabel.next();
	}
	
	getUpdateTableEvent(){
		return this.eventUpdateTabel.asObservable();
	}
	
	updateTableData(user: User): Observable<any>{
		this.httpOptions.headers = this.httpOptions.headers.set('Authorization', JSON.parse(localStorage.getItem('user')).token);
		return this.http.put<any>(this.serverUrl + "updateUser", {data: JSON.stringify(user)}, this.httpOptions)
			.pipe(map(res => res));
	}
	
	hapusTableData(id: string): Observable<any>{
		this.httpOptions.params = this.httpOptions.params.set('id', id);
		return this.http.delete<any>(this.serverUrl + "hapusUser", this.httpOptions)
			.pipe(map(res => res));
	}
}
