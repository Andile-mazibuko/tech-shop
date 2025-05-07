import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  userSubject = new BehaviorSubject<User|null>(null)
  constructor() { }
  
  setLoggedUser(user:User){
    this.userSubject.next(user)
  }
  getLoggedUser():User|null{
    return this.userSubject.getValue()
  }

}
