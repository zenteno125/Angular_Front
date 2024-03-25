import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiurl = "http://localhost:3000/api/v1";

  constructor( private http: HttpClient) { }

  getAllUsers(): Observable<Response <IUser[]>> {
    return this.http.get<Response <IUser[]>>(`${this.apiurl}`)
  }

  getUser(id: number): Observable<Response <IUser>>{
    return this.http.get<Response <IUser>>(`${this.apiurl}/${id}`)
  }

  createNewUser(user: IUser): Observable<Response <IUser>>{
    return this.http.post<Response <IUser>>(`${this.apiurl}`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`)
  }
  
}
