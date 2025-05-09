import { Injectable } from '@angular/core';
import { Product, Wishlist } from '../interfaces/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { globalVars } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishListSubject = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) {}

  addToWishList(wishlist: Wishlist): void {
    this.http
      .post(globalVars.apiUrl + '/add_wishlist', wishlist)
      .subscribe((data) => {
        this.fetchUserWishList(wishlist.user_id);
      });
  }

  getUserWishList(user_id: number): Observable<Product[]> {
    this.fetchUserWishList(user_id);
    return this.wishListSubject;
  }
  deleteFromWishlist(user_id: number, prod_id: number): void {
    this.http
      .delete(`${globalVars.apiUrl}/wishlist_delete/${user_id}/${prod_id}`)
      .subscribe((data) => {
        this.fetchUserWishList(user_id);
      });
  }
  //Helper method
  private fetchUserWishList(user_id: number): void {
    this.http
      .get<Product[]>(`${globalVars.apiUrl}/wishlist/${user_id}`)
      .subscribe((data: Product[]) => {
        this.wishListSubject.next(data);
      });
  }
}
