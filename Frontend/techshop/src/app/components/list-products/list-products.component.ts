import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product.service';
import { Product, User, Wishlist } from '../../interfaces/models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { globalVars } from '../../../utils/global';
import { LoginComponent } from '../login/login.component';
import { WishlistService } from '../../services/wishlist.service';
import { LoggedInUserService } from '../../services/logged-in-user.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  user!: User
  constructor(private logServ: LoggedInUserService,private prodServ: ProductService,private wishServ:WishlistService,private dialog: MatDialog) {}

  ngOnInit(): void {
    
    this.prodServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  viewProduct(product: Product): void {
    this.dialog.open(ProductComponent,{width:"800px", data:product})
  }
  onButtonClick(event: MouseEvent,action: string,prod:Product):void{
    event.stopPropagation()
    if(globalVars.customerAccess){
      if(action.includes('wishlist')){
        this.user = this.logServ.getLoggedUser()
        const wishlist:Wishlist = {prod_id:prod.prod_id!,user_id:this.user.user_id!}
        this.wishServ.addToWishList(wishlist)
      }
    }else{
      this.dialog.open(LoginComponent,{width:'1000px',height:'500px'})
    }
  }
}
