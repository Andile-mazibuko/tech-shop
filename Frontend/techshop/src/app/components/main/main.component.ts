import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Product, User } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { globalVars } from '../../../utils/global';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AccountComponent } from '../account/account.component';
import { ProductComponent } from '../product/product.component';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RouterOutlet,
    RouterModule,
    MatBadgeModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  wishlist: Product[] = [];
  cart: Product[] = [];
  user!: User | null;

  constructor(
    private wishServ: WishlistService,
    private cartServ: CartService,
    private router: Router,
    private dialog: MatDialog,
    private prodServ: ProductService,
    private logServ: LoggedInUserService
  ) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  signUp(): void {
    this.handleUserAuth(SignupComponent, '600px');
  }

  logIn(): void {
    this.handleUserAuth(LoginComponent, '1000px', '500px');
  }

  openAccountInfo(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.dialog.open(AccountComponent, {
      width: '600px',
      position: {
        top: `${rect.top + window.scrollY + 70}px`,
        left: `${rect.left + window.scrollX}px`,
      },
    });
  }

  shopByCatergory(catergory: string): void {
    this.router.navigate(['/category', `/${catergory}`], {
      queryParams: { category: catergory },
    });
  }

  veiwWishlist(): void {
    this.dialog.open(WishlistComponent, {
      width: '600px',
      maxHeight: '500px',
      data: this.wishlist,
    });
  }

  viewCart() {
    this.dialog.open(CartComponent, {
      width: '600px',
      maxHeight: '500px',
      data: this.cart,
    });
  }

  logout() {
    globalVars.customerAccess = false;
    this.user = null;
    this.logServ.setLoggedUser(null);
  }

  /**
   * returns data to the main component after the component has been closed
   * @param component - Component to be opened
   * @param width - width of the dialog box
   * @param height - height of the dialog box
   */
  handleUserAuth(
    component: ComponentType<unknown>,
    width: string,
    height: string = 'auto'
  ) {
    const dialogRef = this.dialog.open(component, {
      width: width,
      height: height,
    });

    dialogRef.afterClosed().subscribe((data: User) => {
      this.user = data;
      if (data.role?.includes('ADMIN')) {
        globalVars.adminAccess = true;
        globalVars.customerAccess = true;
        this.router.navigate(['/admin']);
      }

      //get wishlist
      this.wishServ
        .getUserWishList(this.user.user_id!)
        .subscribe((data: Product[]) => {
          this.wishlist = data;
        });

      //get cart
      this.cartServ
        .getUserCart(this.user!.user_id!)
        .subscribe((data: Product[]) => {
          this.cart = data;
        });
    });
  }
}
