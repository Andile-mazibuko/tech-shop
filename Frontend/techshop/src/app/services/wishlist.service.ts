import { Injectable } from '@angular/core';
import { Wishlist } from '../interfaces/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { globalVars } from '../../utils/global';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  //wishListSubject = new BehaviorSubject<any>({})
  constructor(private http: HttpClient) { }

  addToWishList(wishlist: Wishlist):Observable<any>{
    return this.http.post(globalVars.apiUrl+"/add_wishlist",wishlist)
  }
}
