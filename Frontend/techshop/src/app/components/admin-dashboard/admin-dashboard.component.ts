import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatTableModule } from '@angular/material/table';
import { Order, Product, User } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    MatTableModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  isOpen = true;
  products: Product[] = [];
  orders: Order[] = [];
  users: User[] = [];
  revenue: number = 0;

  displayedColumns: string[] = ['order_id', 'owner', 'status', 'total'];
  dataSource = [
    {
      order_id: 1,
      owner: 'andile@gmail.com',
      status: 'payment recieved',
      total: 'R1299,99',
    },
    {
      order_id: 2,
      owner: 'andile@gmail.com',
      status: 'processing',
      total: 'R1299,99',
    },
    {
      order_id: 3,
      owner: 'andilecsir@gmail.com',
      status: 'payment recieved',
      total: 'R99,99',
    },
    {
      order_id: 4,
      owner: 'canny@gmail.com',
      status: 'Ready for shipping',
      total: 'R500,00',
    },
    {
      order_id: 5,
      owner: 'ruben@gmail.com',
      status: 'in transit',
      total: 'R1299,99',
    },
  ];

  constructor(
    private orderServ: OrderService,
    private dialog: MatDialog,
    private prodServ: ProductService,
    private userServ: UserService
  ) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.orderServ.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      this.calculateAmtGenerated();
    });
    this.userServ.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  widthToggle(): void {
    this.isOpen = !this.isOpen;
  }

  addProduct() {
    this.dialog.open(AddProductComponent, { width: '600px' });
  }

  calculateAmtGenerated(): void {
    this.orders.forEach((order) => {
      this.revenue += order.total;
    });
  }
}
