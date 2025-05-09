import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Product, User, Wishlist } from '../../interfaces/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { globalVars } from '../../../utils/global';
import { LoginComponent } from '../login/login.component';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  user!: User | null;

  constructor(
    private wishServ: WishlistService,
    private dialog: MatDialog,
    private logServ: LoggedInUserService,
    private dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.user = this.logServ.getLoggedUser();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  addTowishlist(prod: Product) {
    if (globalVars.customerAccess) {
      if (this.user?.user_id != null && prod.prod_id != null) {
        const wishlist: Wishlist = {
          prod_id: prod.prod_id,
          user_id: this.user.user_id,
        };
        this.wishServ.addToWishList(wishlist);
      }
    } else {
      this.dialog.open(LoginComponent, {
        width: '1000px',
        height: '500px',
      });
    }
  }
}
