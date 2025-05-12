import { Component, Inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product, User } from '../../interfaces/models';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  user!: User | null;

  constructor(
    private snackServ: SnackbarService,
    private wishServ: WishlistService,
    private logServ: LoggedInUserService,
    private dialogRef: MatDialogRef<WishlistComponent>,
    @Inject(MAT_DIALOG_DATA) public wishlist: Product[]
  ) {}

  ngOnInit(): void {
    this.user = this.logServ.getLoggedUser();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  /**
   * Delete product from user wishlist
   * @param prod - product to be deleted from user wishlist
   */
  deleteProductWishlist(prod: Product): void {
    this.wishServ.deleteFromWishlist(this.user!.user_id!, prod.prod_id!);
    this.wishServ.getUserWishList(this.user!.user_id!).subscribe((data) => {
      this.wishlist = data;
      this.snackServ.openSnackBar('Product removed successfully');
    });
  }
}
