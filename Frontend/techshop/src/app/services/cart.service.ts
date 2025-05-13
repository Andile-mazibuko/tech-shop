import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, User, Wishlist } from '../interfaces/models';
import { HttpClient } from '@angular/common/http';
import { globalVars } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSubject = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) {}

  addToCart(user_product: Wishlist): void {
    this.http
      .post(
        `${globalVars.apiUrl}/add_cart/${user_product.user_id}/${user_product.prod_id}`,
        { user_id: user_product.user_id, prod_id: user_product.prod_id }
      )
      .subscribe((data) => {
        this.refreshCart(user_product.user_id);
      });
    //
  }
  getUserCart(user_id: number): Observable<Product[]> {
    this.refreshCart(user_id);
    return this.cartSubject;
  }
  deleteFromCart(user_id: number, prod_id: number): void {
    this.http
      .delete(`${globalVars.apiUrl}/delete_cart/${user_id}/${prod_id}`)
      .subscribe((data) => {
        this.refreshCart(user_id);
      });
  }

  //Helper method to refresh cart
  private refreshCart(user_id: number): void {
    this.http
      .get<Product[]>(`${globalVars.apiUrl}/user_cart/${user_id}`)
      .subscribe((data: Product[]) => {
        this.cartSubject.next(data);
        //Test cart length
        console.log('CART LENGTH:', data.length);
      });
  }
}
