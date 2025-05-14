import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, UpdateOrderStatus } from '../interfaces/models';
import { globalVars } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  createOrder(order:Order):Observable<any>{
    return this.http.post(`${globalVars.apiUrl}/create_order`,order)
  }
  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${globalVars.apiUrl}/orders`)
  }
  updateOrderStatus(status:UpdateOrderStatus):Observable<any>{
    return this.http.put<any>(`${globalVars.apiUrl}/update_order/status/${status.order_id}`,status)
  }
}
