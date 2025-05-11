import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/models';
import { HttpClient } from '@angular/common/http';
import { globalVars } from '../../utils/global';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubject = new BehaviorSubject<Product[]>([])
  constructor(private http: HttpClient) { }

  addToCart(){}
  //Helper method to refresh cart
  refreshCart(user_id:number): void{
    this.http.get(`${globalVars.apiUrl}/user_cart/${user_id}`)
  }
}
