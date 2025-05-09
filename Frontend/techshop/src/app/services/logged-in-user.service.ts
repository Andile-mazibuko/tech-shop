import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  userSubject = new BehaviorSubject<User>({email:'',first_name:'',last_name:'',password:''})
  constructor() { }
  
  setLoggedUser(user:User){
    this.userSubject.next(user)
  }
  getLoggedUser():User{
    return this.userSubject.getValue()
  }

}
