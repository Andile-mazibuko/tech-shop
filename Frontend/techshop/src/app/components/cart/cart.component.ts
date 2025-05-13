import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order, Product, User } from '../../interfaces/models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  total = 0;
  user: User | null = null;

  constructor(
    private logServ: LoggedInUserService,
    private orderServ: OrderService,
    private cartServ: CartService,
    private dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public cartProducts: Product[]
  ) {}

  ngOnInit(): void {
    this.user = this.logServ.getLoggedUser();
    this.getTotalAmount();
  }

  close(): void {
    this.dialogRef.close();
  }

  getTotalAmount(): void {
    this.cartProducts.forEach((product) => {
      this.total += product.price;
    });
  }

  removeItemFromCart(prod: Product) {
    this.cartServ.deleteFromCart(this.user!.user_id!, prod.prod_id!);
    this.total = Math.round((this.total -= prod.price) * 100) / 100;

    this.cartServ
      .getUserCart(this.user!.user_id!)
      .subscribe((data: Product[]) => {
        this.cartProducts = data;
      });
  }

  checkOutItems(): void {
    const order: Order = {
      user_id: this.user?.user_id!,
      products: this.cartProducts,
      total: this.total,
    };
    this.orderServ.createOrder(order).subscribe((data) => {});

    //drop products on the cart
  }
}
