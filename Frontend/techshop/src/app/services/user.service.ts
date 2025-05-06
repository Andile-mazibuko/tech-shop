import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/models';
import { globalVars } from '../../utils/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(globalVars.apiUrl+'/get_users')
  }

  createAccount(user: User):Observable<any>{
    return this.http.post<any>(globalVars.apiUrl+"/create_account",user)
  }
}
