import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/models';
import { OrderService } from '../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss',
})
export class ListOrdersComponent implements OnInit {
  orders: Order[] = [];
  columns: string[] = [
    'order_id',
    'user_id',
    'total',
    'date',
    'status',
    'action',
    'products',
  ];

  constructor(private orderServ: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.orderServ.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }
  editOrderDialog(order: Order): void {
    this.dialog.open(EditOrderComponent, { width: '300px', data: order });
  }
}
